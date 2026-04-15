import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { updatePlan } from "@/lib/usage";

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature");

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
    console.log(`[Stripe Webhook] Checkout completed for user: ${userId}`);
    
    if (!userId) {
      console.error("[Stripe Webhook] Missing userId in session metadata");
      return NextResponse.json({ error: "No user ID" }, { status: 400 });
    }

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { 
          plan: "pro",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        },
      });
      console.log(`[Stripe Webhook] Successfully upgraded user ${userId} to pro`);
    } catch (dbErr: any) {
      console.error(`[Stripe Webhook] Database update failed: ${dbErr.message}`);
      return NextResponse.json({ error: "Database update failed" }, { status: 500 });
    }
    
    // Sync to Redis for Edge API access
    const email = session.customer_details?.email || session.customer_email;
    if (email) {
      await updatePlan(email, "pro");
      console.log(`[Stripe Webhook] Synced pro plan to Redis for ${email}`);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as any;
    const customerId = subscription.customer as string;
    
    await prisma.user.update({
      where: { stripeCustomerId: customerId },
      data: { plan: "free", stripeSubscriptionId: null },
    });
    
    // Sync to Redis for Edge API access
    if (subscription.customer_email) {
      await updatePlan(subscription.customer_email, "free");
    }

    console.log(`Subscription deleted and plan downgraded for customer: ${customerId}`);
  }

  return NextResponse.json({ received: true });
}
