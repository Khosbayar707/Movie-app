import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-container py-16 sm:py-24">
      <div className="rule-double max-w-2xl pt-4">
        <p className="font-extra-condensed text-[7rem] font-black leading-[0.8] tabular-nums sm:text-[10rem]">404</p>
        <h1 className="font-condensed mt-6 text-3xl font-extrabold uppercase leading-none">Not in this week&apos;s listings</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          The link may be broken, or the page may have moved.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">Back to this week</Link>
        </Button>
      </div>
    </div>
  );
}
