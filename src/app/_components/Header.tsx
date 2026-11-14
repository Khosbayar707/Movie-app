"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCenterActive } from "./useCenterActive";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Theme } from "./Theme";
import { SearchButtonOrInput } from "./SearchInput";
import { Genre } from "./FilterGenre";

const SECTIONS = [
  { href: "/", label: "This week" },
  { href: "/now_playing", label: "Now Playing" },
  { href: "/upcoming", label: "Upcoming" },
  { href: "/top_rated", label: "Top Rated" },
  { href: "/popular", label: "Popular" },
];

const tabClass =
  "font-condensed inline-flex h-10 shrink-0 items-center whitespace-nowrap px-3 text-[15px] font-bold uppercase tracking-[0.02em] transition-colors duration-150";

/** "Week of Nov 9 – 15, 2026": the edition line, computed on the client. */
function useEditionLine() {
  const [line, setLine] = useState<string | null>(null);
  useEffect(() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const md = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
    const sameMonth = start.getMonth() === end.getMonth();
    setLine(
      `Week of ${md.format(start)} – ${sameMonth ? end.getDate() : md.format(end)}, ${end.getFullYear()}`
    );
  }, []);
  return line;
}

export const Header = () => {
  const pathname = usePathname();
  const edition = useEditionLine();
  const [searchOpen, setSearchOpen] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  useCenterActive(stripRef, pathname);

  useEffect(() => setSearchOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* Masthead row */}
      <div className="page-container flex h-16 items-center gap-4">
        <Link
          href="/"
          aria-label="Movie Z, this week's listings"
          className={cn("flex shrink-0 items-center", searchOpen && "hidden md:flex")}
        >
          <img src="/assets/Logo.svg" alt="" width={93} height={21} className="h-6 w-auto sm:h-7 dark:hidden" />
          <img src="/assets/Logo (1).svg" alt="" width={93} height={20} className="hidden h-6 w-auto sm:h-7 dark:block" />
        </Link>

        <p
          className={cn(
            "label-caps hidden border-l border-border pl-4 text-muted-foreground lg:block",
            !edition && "invisible"
          )}
        >
          {edition ?? "Week of"}
        </p>

        <div className={cn("min-w-0 flex-1 justify-end", searchOpen ? "flex" : "hidden md:flex")}>
          <SearchButtonOrInput
            autoFocus={searchOpen}
            onNavigate={() => setSearchOpen(false)}
            className="w-full md:max-w-[340px]"
          />
        </div>

        <div className={cn("flex items-center gap-2", !searchOpen && "ml-auto md:ml-0")}>
          {searchOpen ? (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(false)}>
              <X aria-hidden="true" />
              <span className="sr-only">Close search</span>
            </Button>
          ) : (
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)}>
              <Search aria-hidden="true" />
              <span className="sr-only">Search movies</span>
            </Button>
          )}
          <Theme />
        </div>
      </div>

      {/* Section index, closed by the heavy-over-hairline rule */}
      <div className="border-b-[3px] border-rule">
        <nav aria-label="Sections" className="page-container">
          <ul ref={stripRef} className="no-scrollbar -mx-3 flex items-center overflow-x-auto max-md:[mask-image:linear-gradient(to_right,black_82%,transparent)]">
            {SECTIONS.map((s) => {
              const active = s.href === "/" ? pathname === "/" : pathname.startsWith(s.href);
              return (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      tabClass,
                      active ? "bg-primary text-primary-foreground" : "hover:text-primary"
                    )}
                  >
                    {s.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Genre
                current={pathname.startsWith("/discover")}
                triggerClassName={cn(
                  tabClass,
                  pathname.startsWith("/discover") ? "bg-primary text-primary-foreground" : "hover:text-primary"
                )}
              />
            </li>
          </ul>
        </nav>
      </div>
      <div aria-hidden="true" className="h-px bg-rule opacity-90 [margin-top:2px]" />
    </header>
  );
};
