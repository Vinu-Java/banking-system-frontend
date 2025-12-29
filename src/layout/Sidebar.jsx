import { NavLink, useNavigate } from "react-router-dom";
import { getUserRole, logout } from "../services/auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = getUserRole(); // "USER" or "MANAGER"

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar">
      {role === "USER" && (
        <>
          <NavLink to="/dashboard" className="sidebar-link">
            Dashboard
          </NavLink>

          <NavLink to="/balance-enquiry" className="sidebar-link">
            Balance Enquiry
          </NavLink>

          <NavLink to="/transactions" className="sidebar-link">
            Transactions
          </NavLink>
        </>
      )}

      {role === "MANAGER" && (
        <>
          <NavLink to="/manager/dashboard" className="sidebar-link">
            Dashboard
          </NavLink>

          <NavLink to="/account/create" className="sidebar-link">
            Create Account
          </NavLink>

          <NavLink to="/account/update" className="sidebar-link">
            Update Account
          </NavLink>

          <NavLink to="/account/close" className="sidebar-link">
            Close Account
          </NavLink>

          <NavLink to="/deposit" className="sidebar-link">
            Deposit
          </NavLink>

          <NavLink to="/withdraw" className="sidebar-link">
            Withdraw
          </NavLink>

          <NavLink to="/transfer" className="sidebar-link">
            Transfer
          </NavLink>

          <NavLink to="/manager/transactions" className="sidebar-link">
            Transactions
          </NavLink>
        </>
      )}

      <button className="sidebar-link logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
