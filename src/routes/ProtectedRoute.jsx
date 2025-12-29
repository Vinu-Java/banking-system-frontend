import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

const ProtectedRoute = () => {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
