import RegisterBody from "@/components/body/register/RegisterBody";
import PublicRoute from "@/components/routes/PublicRoute";

const Register = () => {
  return (
    <PublicRoute>
      <div className="w-full h-full flex items-center justify-center">
        <RegisterBody />
      </div>
    </PublicRoute>
  );
};

export default Register;
