import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-6xl font-bold tracking-tight text-primary tabular-nums">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">This page isn&apos;t showing</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The link may be broken, or the page may have moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
