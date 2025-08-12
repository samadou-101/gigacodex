"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUserQuery } from "@/features/auth/services/auth.queries";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && !user) {
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/auth/login?next=${next}`);
    }
  }, [isLoading, user, pathname, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
}
