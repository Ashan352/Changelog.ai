import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getStripeSession } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limit checkout session creation
    const { success } = await checkRateLimit(`checkout-${session.user.id}`);
    if (!success) {
      return NextResponse.json({ error: "Too many checkout attempts. Please wait." }, { status: 429 });
    }

    const { isAnnual } = await req.json();

    const checkoutSession = await getStripeSession(
      session.user.id,
      session.user.email,
      !!isAnnual
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}
