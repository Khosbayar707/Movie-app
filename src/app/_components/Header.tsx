import Link from "next/link";
import { Theme } from "./Theme";
import { SearchButtonOrInput } from "./SearchInput";
import { Genre } from "./FilterGenre";

export const Header = () => {
  return (
    <div className="border-b bg-background">
      <div className="container flex items-center justify-between py-2 mx-auto w-[80%]">
        <a href="/">
          <div className="items-center ">
            <img src="/assets/Logo.svg" alt="logo" />
          </div>
        </a>
        <div className="flex gap-2">
          <div>
            <Genre />
          </div>
          <div>
            <SearchButtonOrInput />
          </div>
          <div>
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
};
