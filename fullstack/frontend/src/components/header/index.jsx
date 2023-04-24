import { Container, Logo } from "./styles";
import { Button } from "../button";
import { FaUser, FaDoorOpen } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../providers/authenticad";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const history = useHistory();

  const Redirect = (isLogged) => {
    if (isLogged) {
      localStorage.clear();
      logout();
    } else if (isLogged === false) {
      history.push("/login");
    }
  };
  return (
    <Container>
      <Logo>ClickBeard</Logo>
      {isAuthenticated ? (
        <Button
          onClick={() => {
            Redirect(isAuthenticated);
          }}
        >
          <FaDoorOpen />
          Logout
        </Button>
      ) : (
        <Button
          onClick={() => {
            Redirect(isAuthenticated);
          }}
        >
          <FaUser />
          Login
        </Button>
      )}
    </Container>
  );
};
