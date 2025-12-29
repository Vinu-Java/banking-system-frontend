import { Navigate, Outlet } from "react-router-dom";
import { getUserRole } from "../services/auth";

const RoleRoute = ({ allowedRoles }) => {
  const role = getUserRole();

  // not logged in → login
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // logged in but wrong role
  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        to={role === "MANAGER" ? "/manager/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleRoute;
