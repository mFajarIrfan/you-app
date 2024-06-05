import InterestBody from "@/components/body/interest/InterestBody";
import PrivateRoute from "@/components/routes/PrivateRoutes";

const Interest = () => {
  return (
    <PrivateRoute>
      <div className="w-full h-full flex items-start justify-center">
        <InterestBody />
      </div>
    </PrivateRoute>
  );
};

export default Interest;
