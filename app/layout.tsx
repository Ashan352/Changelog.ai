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
    default: "Changelog AI Generator | Automated Release Notes",
    template: "%s | Changelog AI Generator",
  },
  description: "The ultimate changelog AI generator. Generate polished changelogs, GitHub releases, and Twitter posts instantly from your Git commits. Built for fast teams.",
  keywords: [
    "changelog AI generator", "changelog generator", "AI release notes", "git commit to changelog", "developer tools", 
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
    canonical: "https://change-log-ai.vercel.app/",
    languages: {
      "en-US": "https://changelog-ai.vercel.app",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://changelog-ai.vercel.app",
    title: "Changelog AI Generator - Automated Release Notes",
    description: "Stop manually writing changelogs. Transform your Git history into polished release notes instantly with our AI-powered generator.",
    siteName: "Changelog AI Generator",
    images: [{
      url: "https://changelog-ai.vercel.app/og-image.png",
      width: 1200,
      height: 630,
      alt: "Changelog AI Preview - Automated Release Notes",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog AI Generator | Automated Release Notes",
    description: "Transform your Git commits into professional release notes instantly with our AI generator.",
    creator: "@changelog_ai",
    images: ["https://changelog-ai.vercel.app/og-image.png"],
  },
  verification: {
    google: "J1p5DIxzr2GfL6I2Ouuu-ASvS8WgjdKlIu4pqawLAHM",
    yandex: "yandex-verification-placeholder",
    yahoo: "yahoo-verification-placeholder",
    other: {
      "msvalidate.01": "0CE40AA79AE219E065CCF60DBDD27315",
    },
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
import Script from 'next/script'

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
          {/* Global Structured Data / Schema.org Markup */}
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebSite",
                    "@id": "https://change-log-ai.vercel.app/#website",
                    "url": "https://change-log-ai.vercel.app/",
                    "name": "Changelog AI Generator",
                    "description": "Generate polished changelogs and release notes instantly from Git commits.",
                    "publisher": {
                      "@type": "Organization",
                      "name": "Changelog AI",
                      "logo": {
                        "@type": "ImageObject",
                        "url": "https://change-log-ai.vercel.app/logo.png"
                      }
                    }
                  },
                  {
                    "@type": "SoftwareApplication",
                    "@id": "https://change-log-ai.vercel.app/#software",
                    "name": "Changelog AI Generator",
                    "applicationCategory": "DeveloperApplication",
                    "operatingSystem": "Any",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD"
                    },
                    "description": "Automatically generate structured release notes and changelogs directly from Git commit history."
                  }
                ]
              })
            }}
          />
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
