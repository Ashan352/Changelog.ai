import Stripe from "stripe";
import { prisma } from "./prisma";

// Lazy Stripe initialization — prevents top-level crash during build
// if STRIPE_SECRET_KEY is not yet available (e.g. during Next.js page collection).
let _stripe: Stripe | null = null;

function getStripeClient(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Missing STRIPE_SECRET_KEY. Please add it to your environment variables.");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripeClient(), prop, receiver);
  },
});

export const getStripeSession = async (userId: string, email: string, isAnnual: boolean) => {
  const client = getStripeClient();
  const priceId = isAnnual 
    ? process.env.STRIPE_ANNUAL_PRICE_ID 
    : process.env.STRIPE_MONTHLY_PRICE_ID;

  if (!priceId || priceId === "price_...") {
    throw new Error("Stripe Price ID not configured. Please add real price IDs to your .env file.");
  }

  // Check if user already has a Stripe Customer ID
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true }
  });

  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
    },
  };

  // Link to existing customer or use email
  if (user?.stripeCustomerId) {
    sessionConfig.customer = user.stripeCustomerId;
  } else {
    sessionConfig.customer_email = email;
  }

  return await client.checkout.sessions.create(sessionConfig);
};
