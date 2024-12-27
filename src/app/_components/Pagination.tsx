"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

export const Pagination = ({}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newURL = pathName + "?" + newSearchParams.toString();
    router.push(newURL);
    console.log(newURL);
  };

  return (
    <div className="flex justify-center gap-4 w-[90%] my-4">
      <Button variant="outline" size="icon" onClick={() => onChangePage(1)}>
        <ChevronLeft />
      </Button>
      <Button variant="outline" size="icon" onClick={() => onChangePage(2)}>
        2
      </Button>
      <Button variant="outline" size="icon" onClick={() => onChangePage(3)}>
        <ChevronRight />
      </Button>
    </div>
  );
};
