import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"] as const,
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"] as const,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://changelog-ai.vercel.app"),
  title: {
    default: "Changelog AI | Stop writing changelogs. Automate release notes.",
    template: "%s | Changelog AI",
  },
  description: "Paste your Git commits and generate polished changelogs, GitHub releases, and Twitter posts in seconds. Built for solo developers and fast-moving teams.",
  keywords: [
    "changelog generator", "AI release notes", "git commit to changelog", "developer tools", 
    "github release generator", "automated changelog", "release notes generator", "AI developer tools",
    "software updates formatting", "project management AI", "changelog automation"
  ],
  authors: [{ name: "Changelog AI", url: "https://changelog-ai.vercel.app" }],
  creator: "Changelog AI",
  publisher: "Changelog AI",
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
  alternates: {
    canonical: "https://changelog-ai.vercel.app",
    languages: {
      "en-US": "https://changelog-ai.vercel.app",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://changelog-ai.vercel.app",
    title: "Changelog AI - Zero-effort release notes",
    description: "Developers ship code constantly — writing changelogs is a recurring, annoying task everyone procrastinates. Automate it instantly with Changelog AI.",
    siteName: "Changelog AI",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Changelog AI Preview - Automated Release Notes",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog AI | Stop writing changelogs",
    description: "Generate polished changelogs and release notes instantly from your commits.",
    creator: "@changelog_ai",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/site.webmanifest",
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
        className={`${inter.variable} ${robotoMono.variable} antialiased selection:bg-accent/40 selection:text-text-primary`}
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
