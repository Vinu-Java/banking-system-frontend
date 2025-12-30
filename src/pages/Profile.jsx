import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountByAccountNumber } from "../services/api";
import { getAccountNumber } from "../services/auth";

export default function Profile() {
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accountNumber = getAccountNumber();

    if (!accountNumber) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getAccountByAccountNumber(accountNumber);
        setAccount(res?.data || res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <h3>Loading profile...</h3>;

  if (!account) {
    return (
      <div className="page">
        <h2 className="page-title">Profile Not Found</h2>
        <button
          className="form-cancel-btn"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">My Profile</h2>

      <div className="profile-avatar-center">
        <div className="profile-avatar">
          {account.name?.charAt(0).toUpperCase()}
        </div>

        <h3 className="profile-name">{account.name}</h3>
      </div>

      <div className="form">
        <div className="details-group">
          <span className="details-label">Account Number</span>
          <span className="details-value">{account.accountNumber}</span>
        </div>

        <div className="details-group">
          <span className="details-label">Name</span>
          <span className="details-value">{account.name}</span>
        </div>

        <div className="details-group">
          <span className="details-label">Email</span>
          <span className="details-value">{account.email}</span>
        </div>

        <div className="details-group">
          <span className="details-label">Phone</span>
          <span className="details-value">{account.phone}</span>
        </div>

        <div className="details-group">
          <span className="details-label">Account Type</span>
          <span className="details-value">{account.type}</span>
        </div>

        <div className="details-group">
          <span className="details-label">Status</span>
          <span className="details-value">{account.status}</span>
        </div>

        <div className="form-actions">
          <button
            className="form-cancel-btn"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
