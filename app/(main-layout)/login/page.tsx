import LoginPage from "@/views/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
