import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY. Please add it to your environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
});

export const getStripeSession = async (userId: string, email: string, isAnnual: boolean) => {
  const priceId = isAnnual 
    ? process.env.STRIPE_ANNUAL_PRICE_ID 
    : process.env.STRIPE_MONTHLY_PRICE_ID;

  if (!priceId || priceId === "price_...") {
    throw new Error("Stripe Price ID not configured. Please add real price IDs to your .env file.");
  }

  return await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXTAUTH_URL}/?upgraded=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/`,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
    },
  });
};
