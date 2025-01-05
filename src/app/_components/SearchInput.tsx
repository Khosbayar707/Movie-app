"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";
import { Suggestion } from "./Suggestion";

export const SearchButtonOrInput = () => {
  const isLargeScreen = useMediaQuery({ minWidth: 550 });
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  // console.log("searchValue ----", searchValue);

  if (isLargeScreen || showInput) {
    return (
      <div className="relative">
        <Input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          autoFocus={showInput}
          className="pr-4 w-full"
        />
        {!isLargeScreen && (
          <div
            onClick={() => setShowInput(false)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
          >
            ✖
          </div>
        )}
        <Suggestion searchValue={searchValue} />
      </div>
    );
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setShowInput(true)}>
        <Search />
      </Button>
    </>
  );
};
