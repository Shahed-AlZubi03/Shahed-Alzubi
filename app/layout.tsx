import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GradientWave } from "@/components/ui/gradient-wave";
import { site } from "@/lib/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Full-Stack Developer",
    "AI Engineer",
    "LLM applications",
    "multi-agent systems",
    "FastAPI",
    "Next.js",
    "freelance developer",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    // A committed PNG rather than a generated `opengraph-image` route: static
    // hosts serve the generated file without an extension, so crawlers get
    // application/octet-stream and drop the preview.
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.role }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/**
 * Stamps `data-js` before paint, which is what lets CSS style for the
 * with-script case only. `AnimatedText` needs its split letters hidden before
 * the first paint — otherwise the heading paints in full and then blinks out
 * as Motion resets it (measured at 371ms of visible text under a 6x CPU
 * throttle) — but hiding them unconditionally would leave the text invisible
 * whenever the JS does not arrive. Gating on this attribute gets both.
 * `MagicText` leans on the same flag for its dim state.
 *
 * It used to apply a stored theme too. The site is single-theme now, so there
 * is nothing to restore and no flash to head off.
 */
const bootScript = `try{document.documentElement.dataset.js="1"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Ambient backdrop shared by every route. `fixed` keeps the canvas
            viewport-sized however long a page grows and holds the wash still
            while content scrolls over it. The opacity is deliberately low:
            body copy has to stay at AA contrast on top of it everywhere. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.22]"
        >
          <GradientWave
            softness={1.4}
            noiseFrequency={[0.00006, 0.00035]}
            deform={{ incline: 0.35, noiseAmp: 300, noiseFlow: 3.5 }}
          />
        </div>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
