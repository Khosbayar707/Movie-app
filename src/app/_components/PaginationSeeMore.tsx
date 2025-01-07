"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageInfo } from "../[category]/page";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getVisiblePages = (currentPages: number) => {
  if (currentPages < 3) {
    return [1, 2, 3];
  }
  return [currentPages - 1, currentPages, currentPages + 1];
};

export const PaginationSeeMore = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const pathName = usePathname();
  const router = useRouter();

  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newURL = pathName + "?" + newSearchParams.toString();
    router.push(newURL);
  };
  // const lastPage = pageInfo.totolPage > 500 ? 500 : pageInfo.totalPage;
  const visiblePages = getVisiblePages(pageInfo.currentPages);

  return (
    <div className="flex justify-center gap-2 w-[90%] my-4">
      {pageInfo.currentPages > 1 && (
        <Button
          variant={"outline"}
          onClick={() => onChangePage(pageInfo.currentPages - 1)}
          className="cursor-pointer"
        >
          Prev
        </Button>
      )}

      {visiblePages.map((page) => (
        <Button
          variant={"outline"}
          onClick={() => onChangePage(page)}
          className={`cursor-pointer ${
            pageInfo.currentPages === page ? "font-bold underline" : ""
          }`}
          key={page}
        >
          {page}
        </Button>
      ))}
      {/*<div onClick={() => onChangePage(lastPage)}>{lastPage}</div> */}
      <Button
        variant={"outline"}
        onClick={() => onChangePage(pageInfo.currentPages + 1)}
        className="cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
};
