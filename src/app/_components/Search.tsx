"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";

export const SearchButtonOrInput = () => {
  const isLargeScreen = useMediaQuery({ minWidth: 550 });
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  if (isLargeScreen || showInput) {
    return (
      <div className="relative">
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          autoFocus={showInput} // Focus input when it appears
          className="pr-10 w-full" // Add padding for the button
        />
        {!isLargeScreen && (
          <div
            onClick={() => setShowInput(false)} // Optionally hide input
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2" // Position the button inside the input
          >
            ✖
          </div>
        )}
      </div>
    );
  }

  return (
    <Button variant="outline" size="icon" onClick={() => setShowInput(true)}>
      <Search />
    </Button>
  );
};
