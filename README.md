# Changelog.ai Setup Guide

Welcome to the backend setup instructions for Changelog.ai. To ensure the platform runs correctly with full Authentication and Database functionality, you must configure **GitHub OAuth**, **Google OAuth**, and **Supabase (Prisma Postgres)**.

## 1. Database Configuration (Supabase)
This project uses **Prisma** paired tightly with a serverless Postgres database (Supabase is recommended).

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Navigate to **Project Settings > Database** and copy your Postgres connection URI.
3. Replace the `DATABASE_URL` in your `.env` file with this connection string. It should look like:
   `DATABASE_URL="postgres://postgres:password@db.supabase.co:5432/postgres"`
4. Run the following command in your terminal to initialize your database tables:
   ```bash
   npx prisma db push
   ```

## 2. Authentication Configuration (GitHub & Google)
Changelog.ai relies on `next-auth` to securely handle user sessions.

### GitHub OAuth Setup:
1. Go to your [GitHub Developer Settings](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in the following:
   * **Application name**: `Changelog.ai (Local)`
   * **Homepage URL**: `http://localhost:3000`
   * **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**.
5. Copy the generated **Client ID** into your `.env` file as `GITHUB_ID`.
6. Click **Generate a new client secret** and copy it into your `.env` file as `GITHUB_SECRET`.

### Google OAuth Setup:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new Project or select an existing one.
3. Navigate to **APIs & Services > Credentials**.
4. Click **Create Credentials > OAuth client ID**. (Determine "Web application" as the app type).
5. Add Authorized Redirect URIs:
   * `http://localhost:3000/api/auth/callback/google`
6. Copy the resulting **Client ID** into `.env` as `GOOGLE_ID`.
7. Copy the resulting **Client Secret** into `.env` as `GOOGLE_SECRET`.

## 3. Stripe & OpenRouter Setup
* Ensure your `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are correctly assigned to handle `pro` subscription updates.
* Ensure your `OPENROUTER_API_KEY` is credited to route traffic to Claude 3.5 Sonnet for Pro users.

Once these `.env` variables are correctly assigned, boot your dev server using `npm run dev` and your application is fully production-ready.

## 4. Security & Optimization (Vercel Edge)
To ensure the platform remains secure and stays within Vercel's Free-tier limits:
* **Edge Middleware**: We use Edge-based rate limiting to protect API endpoints from excessive serverless invocations.
* **Optimized Auth**: Authentication is split into a lean `auth.config.ts` for Edge compatibility, ensuring the middleware bundle remains under 1MB.
* **Strict Validation**: All user inputs are validated via `Zod` schemas.
