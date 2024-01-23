import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAuth from "../Hooks/useAuth";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <Loader />;
  else if (user) return children;
  else return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default UserRoute;
