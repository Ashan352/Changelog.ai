import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { updatePlan } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature");

  console.log(`[Stripe Webhook Incoming] Body Length: ${body.length}, Signature Present: ${!!signature}`);

  if (!signature) {
    return NextResponse.json({ error: "No signature provided" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
  }

  const session = event.data.object as any;
  console.log(`[Stripe Webhook] Received Event: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const email = (session.customer_details?.email || session.customer_email)?.toLowerCase();
    const customerId = session.customer as string;
    
    console.log(`[Stripe Webhook] Checkout completed. UserID: ${userId}, Email: ${email}, CustomerID: ${customerId}`);
    
    if (!email && !userId && !customerId) {
      console.error("[Stripe Webhook] Critical: Missing all identity markers");
      return NextResponse.json({ error: "Missing identity metadata" }, { status: 400 });
    }

    try {
      // Find all accounts associated with any of these identifiers
      const usersToUpgrade = await prisma.user.findMany({
        where: {
          OR: [
            ...(email ? [{ email }] : []),
            ...(userId ? [{ id: userId }] : []),
            ...(customerId ? [{ stripeCustomerId: customerId }] : [])
          ]
        },
        select: { id: true, email: true }
      });

      if (usersToUpgrade.length === 0) {
        console.warn(`[Stripe Webhook] No users found for the provided identifiers. (Email: ${email}, UID: ${userId}, CID: ${customerId})`);
      }

      const userIds = usersToUpgrade.map(u => u.id);

      // Aggressively update all found IDs in a single bulk operation
      const { count } = await prisma.user.updateMany({
        where: {
          id: { in: userIds }
        },
        data: { 
          plan: "pro",
          stripeCustomerId: customerId,
          stripeSubscriptionId: session.subscription as string,
        },
      });

      console.log(`[Stripe Webhook] Successfully upgraded ${count} account(s) to pro.`);

      // Sync unique emails to Redis
      const uniqueEmails = Array.from(new Set(usersToUpgrade.map(u => u.email).filter(Boolean)));
      for (const uEmail of uniqueEmails) {
        await updatePlan(uEmail as string, "pro");
      }
    } catch (dbErr: any) {
      console.error(`[Stripe Webhook] Aggressive update failed: ${dbErr.message}`);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as any;
    const customerId = subscription.customer as string;
    
    // Attempt to find user to get email for bulk downgrade
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
      select: { email: true }
    });

    const updateFilter = user?.email ? { email: user.email } : { stripeCustomerId: customerId };

    const { count } = await prisma.user.updateMany({
      where: updateFilter,
      data: { plan: "free", stripeSubscriptionId: null },
    });
    
    // Sync to Redis for Edge API access
    if (user?.email) {
      await updatePlan(user.email, "free");
    }

    console.log(`[Stripe Webhook] Subscription deleted. Downgraded ${count} account(s) for customer: ${customerId}`);
  }

  return NextResponse.json({ received: true });
}
