"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./provider/AuthProvider";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setIsAllowed(true);
      }
    };
    checkAuth();
  }, [isAuthenticated, router]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
