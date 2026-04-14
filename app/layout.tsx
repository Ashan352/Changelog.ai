import type { Metadata } from "next";
import { Oswald, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"] as const,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"] as const,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://changelog-ai.vercel.app"),
  title: {
    default: "Changelog AI | Stop writing changelogs. Automate release notes.",
    template: "%s | Changelog AI",
  },
  description: "Paste your Git commits and generate polished changelogs, GitHub releases, and Twitter posts in seconds. Built for solo developers and fast-moving teams.",
  keywords: ["changelog generator", "AI release notes", "git commit to changelog", "developer tools", "github release generator", "automated changelog"],
  authors: [{ name: "Changelog AI" }],
  creator: "Changelog AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://changelog-ai.vercel.app", // User can replace with custom domain
    title: "Changelog AI - Zero-effort release notes",
    description: "Developers ship code constantly — writing changelogs is a recurring, annoying task everyone procrastinates. Automate it instantly.",
    siteName: "Changelog AI",
    images: [{
      url: "/og-image.png", // Recommended to add this asset later
      width: 1200,
      height: 630,
      alt: "Changelog AI Preview",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog AI | Stop writing changelogs",
    description: "Generate polished changelogs and release notes instantly from your commits.",
    creator: "@changelog_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
  },
};

import { Spotlight } from "@/components/ui/Spotlight";
import { VisualDistortion } from "@/components/ui/VisualDistortion";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${montserrat.variable} antialiased selection:bg-accent/40 selection:text-text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          <SmoothScroll>
            <TooltipProvider>
              <Spotlight />
              <VisualDistortion />
              {children}
            </TooltipProvider>
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
