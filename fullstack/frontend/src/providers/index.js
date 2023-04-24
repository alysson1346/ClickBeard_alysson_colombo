import { AuthProvider } from "./authenticad";

const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
