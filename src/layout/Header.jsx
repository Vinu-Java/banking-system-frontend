import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../services/auth";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  // 🔹 Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Close popup on route change
  useEffect(() => {
    setShowProfileMenu(false);
  }, [location.pathname]);

  // 🔹 Close popup on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="header">
      <div className="header-inner">
        <div className="header-left">
          <button
            className={`menu-btn ${sidebarOpen ? "open" : ""}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <h2
            className="app-title"
            onClick={() => navigate("/dashboard", { replace: true })}
          >
            Banking System
          </h2>
        </div>

        <div className="header-right">
          <div ref={profileRef}>
            <div
              className="profile-box clickable"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((prev) => !prev);
              }}
            >
              <span className="username">{user.userName}</span>
              <span className="avatar">
                {user?.userName?.charAt(0)?.toUpperCase() || "?"}
              </span>
            </div>

            {showProfileMenu && (
              <div className="profile-menu">
                <button onClick={() => navigate("/profile")}>Profile</button>
                <button className="danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
