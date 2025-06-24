import RegisterForm from "@/components/views/RegisterForm";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
