import { useAuth } from "../../providers/authenticad";
import { Redirect } from "react-router-dom";
import Dashboard from "../../components/dashboard";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
