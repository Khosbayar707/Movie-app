import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const sections = [
  { href: "/now_playing", label: "Now Playing" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/top_rated", label: "Top Rated" },
  { href: "/popular", label: "Popular" },
  { href: "/discover", label: "All genres" },
];

/** The back page colophon: printed in ink on stock under a heavy rule. */
export function Footer() {
  return (
    <footer className="mt-auto border-t-[3px] border-rule bg-background">
      <div className="page-container pb-10 pt-12">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
          <img src="/assets/Logo.svg" alt="Movie Z" width={93} height={21} className="h-7 w-auto dark:hidden" />
          <img src="/assets/Logo (1).svg" alt="Movie Z" width={93} height={20} className="hidden h-7 w-auto dark:block" />
          <p className="label-caps text-muted-foreground">This week&apos;s movie listings</p>
        </div>

        <div className="grid gap-10 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-muted-foreground">© 2024 Movie Z. All Rights Reserved.</p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Movie data and images from TMDB. This product uses the TMDB API but is not endorsed
              or certified by TMDB.
            </p>
          </div>

          <div>
            <h2 className="label-caps mb-4 border-b border-border pb-2">Sections</h2>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="font-medium decoration-primary decoration-2 hover:text-primary hover:underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label-caps mb-4 border-b border-border pb-2">Contact Information</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <a href="mailto:support@movieZ.com" className="font-medium decoration-primary decoration-2 hover:text-primary hover:underline">
                  support@movieZ.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <a href="tel:+976111234567" className="font-medium tabular-nums decoration-primary decoration-2 hover:text-primary hover:underline">
                  +976 (11) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
