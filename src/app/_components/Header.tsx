"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Theme } from "./Theme";
import { SearchButtonOrInput } from "./SearchInput";
import { Genre } from "./FilterGenre";

export const Header = () => {
  // Phones swap the logo row for a full-width search field.
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="page-container flex h-16 items-center gap-3">
        <Link
          href="/"
          aria-label="Movie Z home"
          className={cn("shrink-0 rounded-md", searchOpen && "hidden md:block")}
        >
          <img src="/assets/Logo.svg" alt="" width={93} height={21} className="h-5 w-auto dark:hidden" />
          <img src="/assets/Logo (1).svg" alt="" width={93} height={20} className="hidden h-5 w-auto dark:block" />
        </Link>

        <div
          className={cn(
            "min-w-0 flex-1 items-center justify-center gap-3",
            searchOpen ? "flex" : "hidden md:flex"
          )}
        >
          <Genre className="hidden md:inline-flex" />
          <SearchButtonOrInput
            autoFocus={searchOpen}
            onNavigate={() => setSearchOpen(false)}
            className="w-full md:max-w-[420px]"
          />
        </div>

        <div className={cn("flex items-center gap-2", !searchOpen && "ml-auto md:ml-0")}>
          {searchOpen ? (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(false)}
            >
              <X aria-hidden="true" />
              <span className="sr-only">Close search</span>
            </Button>
          ) : (
            <>
              <Genre className="md:hidden" compact />
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setSearchOpen(true)}
              >
                <Search aria-hidden="true" />
                <span className="sr-only">Search movies</span>
              </Button>
            </>
          )}
          <Theme />
        </div>
      </div>
    </header>
  );
};
