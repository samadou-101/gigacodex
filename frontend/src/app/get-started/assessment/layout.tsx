"use client";

import AuthGuard from "@/features/auth/components/AuthGuard";

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
