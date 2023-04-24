import { Body } from "./styles";
import { CreateAccountForm } from "../../components/createAccount";
import { useAuth } from "../../providers/authenticad";
import { Redirect } from "react-router-dom";

const CreateAccount = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }
  return (
    <Body>
      <CreateAccountForm />
    </Body>
  );
};

export default CreateAccount;
