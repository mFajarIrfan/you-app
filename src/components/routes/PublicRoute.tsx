"use client";

import { useEffect } from "react";
import { useAuth } from "./provider/AuthProvider";
import { useRouter } from "next/navigation";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PublicRoute;
