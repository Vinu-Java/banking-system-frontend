import { NavLink, useNavigate } from "react-router-dom";
import { getUserRole, logout } from "../services/auth";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const role = getUserRole(); // "USER" or "MANAGER"

  const handleLogout = () => {
    logout();
    setSidebarOpen(false); 
    navigate("/login", { replace: true });
  };

  const handleLinkClick = () => {
    setSidebarOpen(false); 
  };

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {role === "USER" && (
          <>
            <NavLink
              to="/dashboard"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/balance-enquiry"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Balance Enquiry
            </NavLink>

            <NavLink
              to="/user-transfer"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Transfer Money
            </NavLink>

            <NavLink
              to="/transactions"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Transactions
            </NavLink>

            <NavLink
              to="/profile"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Profile
            </NavLink>
          </>
        )}

        {role === "MANAGER" && (
          <>
            <NavLink
              to="/manager/dashboard"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/account/create"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Create Account
            </NavLink>

            <NavLink
              to="/account/update"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Update Account
            </NavLink>

            <NavLink
              to="/account/close"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Close Account
            </NavLink>

            <NavLink
              to="/deposit"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Deposit
            </NavLink>

            <NavLink
              to="/withdraw"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Withdraw
            </NavLink>

            <NavLink
              to="/transfer"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Transfer
            </NavLink>

            <NavLink
              to="/manager/transactions"
              className="sidebar-link"
              onClick={handleLinkClick}
            >
              Transactions
            </NavLink>
          </>
        )}

        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
