import * as React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Trailer() {
  return (
    <Button variant="outline" size="icon">
      <Play />
    </Button>
  );
}
