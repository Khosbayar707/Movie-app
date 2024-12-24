"use client";
import Link from "next/link";
import { Theme } from "./Theme";
import { SearchItem } from "./Search";

export const Header = () => {
  return (
    <div className="border-b bg-background">
      <div className="container flex items-center justify-between py-3 mx-auto w-[80%]">
        <div className="items-center ">
          <img src="/assets/Logo.svg" alt="logo" />
        </div>
        <div className="flex space-x-4 flex-end">
          <div>
            <SearchItem />
          </div>
          <div className="flex space-x-4 flex-end">
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
};
