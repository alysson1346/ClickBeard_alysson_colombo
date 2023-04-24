import { Header } from "../../components/header";
import { useAuth } from "../../providers/authenticad";
import { Redirect } from "react-router-dom";
import { DashBoardClient } from "../../components/dashBoardClient";

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Header />
      <DashBoardClient />
    </>
  );
};

export default DashboardPage;
