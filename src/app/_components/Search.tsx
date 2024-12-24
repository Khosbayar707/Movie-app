"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchItem() {
  return (
    <Button variant="outline" size="icon">
      <Search />
    </Button>
  );
}
