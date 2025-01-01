"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getVisiblePages = (currentPage: number) => {
  if (currentPage < 3) {
    return [1, 2, 3, 4, 5];
  }
  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
};

export const Pagination = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const pathName = usePathname();
  const router = useRouter();

  let newArrey = [];
  for (let i = Number(page) + 1; i < Number(page) + 10; i++) {
    newArrey.push(i);
  }

  const onChangePage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newURL = pathName + "?" + newSearchParams.toString();
    router.push(newURL);
  };
  const lastPage = pageInfo.totolPage > 500 ? 500 : pageInfo.totalPage;
  const visiblePages = getVisiblePages(pageInfo.currentPage);

  return (
    <div className="flex justify-center gap-4 w-[90%] my-4">
      {pageInfo.currentPage > 1 && (
        <div
          onClick={() => onChangePage(pageInfo.currentPage - 1)}
          className="cursor-pointer"
        >
          Prev
        </div>
      )}
      {visiblePages[0] > 1 && <div>...</div>}
      {visiblePages.map((page) => (
        <div
          onClick={() => onChangePage(page)}
          className={`cursor-pointer ${
            pageInfo.currentPage === page ? "font-bold underline" : ""
          }`}
          key={page}
        >
          {page}
        </div>
      ))}
      {visiblePages[visiblePages.length - 1] < lastPage && <div>...</div>}
      <div onClick={() => onChangePage(lastPage)}>{lastPage}</div>
      {pageInfo.currentPage < lastPage && (
        <div onClick={() => onChangePage(pageInfo.currentPage + 1)}>Next</div>
      )}
    </div>
  );
};
