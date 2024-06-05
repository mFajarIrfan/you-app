import React from "react";
import PrivateRoute from "@/components/routes/PrivateRoutes";

const UserProfile = React.lazy(() => import("@/components/body/home/HomeBody"));

export default function Home() {
  return (
    <PrivateRoute>
      <div className="w-full h-fit flex items-start justify-center">
        <UserProfile />
      </div>
    </PrivateRoute>
  );
}
