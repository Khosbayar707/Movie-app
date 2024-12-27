import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
}: {
  currentPage?: number;
  totalPages?: number;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return; // Prevent invalid page navigation
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", newPage.toString());
    const newURL = pathName + "?" + newSearchParams.toString();
    router.push(newURL);
    console.log(newURL); // Keep your logging intact
  };

  return (
    <div className="flex justify-center gap-4 w-[90%] my-4">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      {/* Page Buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => onChangePage(page)}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
