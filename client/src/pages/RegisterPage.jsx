import AuthLayout from "../components/auth/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your smarter study journey"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default RegisterPage;