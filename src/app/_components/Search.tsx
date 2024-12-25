"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useMediaQuery } from "react-responsive";

export const SearchButtonOrInput = () => {
  const isLargeScreen = useMediaQuery({ minWidth: 550 });
  const [searchValue, setSearchValue] = useState("");

  if (isLargeScreen) {
    return (
      <div className="">
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
      </div>
    );
  }
  return (
    <Button variant="outline" size="icon">
      <Search />
    </Button>
  );
};

