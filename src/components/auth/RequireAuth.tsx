"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname || "/profile")}`);
    }
  }, [isLoading, user, pathname, router]);

  if (isLoading || !user) {
    return (
      <main className="wrap section min-h-[55vh] grid place-items-center text-center">
        <div>
          <p className="eyebrow">Your Adjoa Yeboah account</p>
          <h1 className="mt-3 font-display text-3xl">Checking your account…</h1>
          <p className="mt-3 text-sm text-[var(--color-muted)]">You’ll return to your page after signing in.</p>
          <Link href="/login" className="mt-6 inline-flex underline">Go to login</Link>
        </div>
      </main>
    );
  }
  return <>{children}</>;
}
