import { LoginForm } from "../../components/login";
import { Body } from "./styles";
import { useAuth } from "../../providers/authenticad";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <Body>
      <LoginForm />
    </Body>
  );
};

export default LoginPage;
