import Link from "next/link";
import { Theme } from "./Theme";
import { SearchButtonOrInput } from "./SearchInput";
import { Genre } from "./FilterGenre";
import { Suggestion } from "./SearchResult";

export const Header = () => {
  return (
    <div className="border-b bg-background">
      <div className="container flex items-center justify-between py-3 mx-auto w-[80%]">
        <a href="/">
          <div className="items-center ">
            <img src="/assets/Logo.svg" alt="logo" />
          </div>
        </a>
        <div className="flex gap-5">
          <div>
            <Genre />
          </div>
          <div>
            <SearchButtonOrInput />
          </div>
          <div className="">
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
};
