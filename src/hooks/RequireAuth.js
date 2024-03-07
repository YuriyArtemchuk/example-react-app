import { useLocation, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  console.log(user);

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
