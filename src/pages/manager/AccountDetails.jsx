import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccountByAccountNumber } from "../../services/api";

export default function AccountDetails() {
  const { accountNumber } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccountByAccountNumber(accountNumber);
        setAccount(res || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [accountNumber]);

  if (loading) return <h3>Loading account details...</h3>;

  if (!account) {
    return (
      <div className="page">
        <h2 className="page-title">Account Not Found</h2>
        <button
          className="form-cancel-btn"
          onClick={() => navigate("/manager/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">Account Details</h2>

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

        <div className="verified-box">
          <span className="verified-label">Available Balance</span>
          <span className="verified-sub">₹ {account.balance}</span>
        </div>

        <div className="form-actions">
          <button
            className="form-cancel-btn"
            onClick={() => navigate("/manager/dashboard", { replace: true })}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
