import LoginBody from "@/components/body/login/LoginBody";
import PublicRoute from "@/components/routes/PublicRoute";

const Login = () => {
  return (
    <>
      <PublicRoute>
        <div className="w-full h-full flex items-center justify-center">
          <LoginBody />
        </div>
      </PublicRoute>
    </>
  );
};

export default Login;
