import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/api";
import "../../styles/UserDashboard.css";
import "../../styles/forms.css";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getProfile();
      // console.log(data);
      setUser(data);
    } catch (err) {
      // console.log(err);
      if (err.message === "SESSION_EXPIRED") {
        localStorage.clear();
        navigate("/login");
      } else {
        setError("Unable to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard error">{error}</div>;
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Account Overview</p>

        <p className="status-row">
          Status:
          <span className={`status ${user.status?.toLowerCase()}`}>
            {user.status}
          </span>
        </p>
      </div>

      <div className="card-container">
        <div className="card">
          <h4>Account Number</h4>
          <p>{user.accountNumber}</p>
        </div>

        <div className="card">
          <h4>Account Type</h4>
          <p>{user.accountType}</p>
        </div>
      </div>

      <div className="info-card">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>
    </div>
  );
}
