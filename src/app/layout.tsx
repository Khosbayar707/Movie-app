import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import "./globals.css";

import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import Loading from "./loading";

// One workhorse family; its width axis gives the condensed listings headline voice.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Movie Z", template: "%s · Movie Z" },
  description:
    "This week's movie listings: what's in theaters, coming soon and top rated, with trailers, cast and ratings.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d12" },
  ],
};

const DIRECTION_CONTRACT = `<!--
THESIS: Movie Z is this week's listings magazine. Every list reads as a ruled, numbered listing with the deciding facts lined up; it refuses the streaming-row catalog of backdrop heroes and endless poster carousels.
OWN-WORLD: Ink on bright stock (late edition: reversed from night black), Movie Z indigo as the only spot ink and only on pressable things, star-gold printed ratings. Archivo condensed headlines, tabular figures in fixed cells, a heavy rule over each section head with a 1px hairline closing it, square corners, clean full-color stills in hairline boxes that print in from ink on change.
STORY: A viewer scans this week's listings, previews a pick, checks the facts box, watches the trailer and opens the film; a reviewer sees a finished editorial system.
FIRST VIEWPORT: Masthead with logo, edition date and section index; below, a boxed Pick of the Week still (7/12) with a condensed title, fact cells and Watch trailer in indigo, beside a numbered Now Playing listing (5/12) whose rows re-print the still on hover.
FORM: Listings magazine, position 7 of 7, seed ec90cd32.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={archivo.variable}>
      <body className="font-sans">
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
