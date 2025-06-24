import LoginForm from "@/components/views/LoginForm";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
