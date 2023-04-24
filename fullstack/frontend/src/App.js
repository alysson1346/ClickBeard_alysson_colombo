import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import CreateAccount from "./pages/createAccount";
import { useEffect } from "react";
import { useAuth } from "./providers/authenticad";
import DashboardPage from "./pages/dashboard";

const App = () => {
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@UserAuthorization:token"));

    if (token) {
      login();
    } else {
      logout();
    }
  }, [isAuthenticated]);
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>

      <Route exact path="/create-account">
        <CreateAccount />
      </Route>

      <Route exact path="/dashboard">
        <DashboardPage />
      </Route>
    </Switch>
  );
};

export default App;
