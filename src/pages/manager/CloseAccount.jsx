import { useState } from "react";
import { toast } from "react-toastify";
import { getAccountByAccountNumber, closeAccount } from "../../services/api";
import "../../styles/forms.css";
import { replace, useNavigate } from "react-router-dom";

export default function CloseAccount() {
  const [accountNumber, setAccountNumber] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    if (!accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }

    try {
      const data = await getAccountByAccountNumber(accountNumber);
      setAccount(data);
    } catch (err) {
      toast.error("Invalid account number");
    }
  };

  const handleCloseAccount = async () => {
    if (!window.confirm("Are you sure you want to close this account?")) return;

    setLoading(true);

    try {
      await closeAccount(accountNumber);
      toast.success("Account closed successfully");
      handleCancel(); 
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to close account";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAccount(null);
    setAccountNumber("");
    setLoading(false);
    navigate("/manager/dashboard", { replace: true });
  };

  return (
    <div className="page">
      <h2 className="page-title">Close Account</h2>

      {!account && (
        <div className="form">
          <div className="form-group">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-input"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
            />
          </div>

          <div className="form-actions">
            <button className="form-submit-btn" onClick={fetchAccount}>
              Verify Account
            </button>

            <button
              type="button"
              className="form-cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {account && (
        <div className="form">
          <div className="form-group">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-input"
              value={account.accountNumber}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Holder</label>
            <input
              type="text"
              className="form-input"
              value={account.name}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-input"
              value={account.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-input"
              value={account.phone}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Type</label>
            <input
              type="text"
              className="form-input"
              value={account.type}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-input"
              value={account.status}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Balance</label>
            <input
              type="text"
              className="form-input"
              value={account.balance}
              disabled
            />
          </div>

          <div className="form-actions">
            <button
              className="form-submit-btn danger"
              onClick={handleCloseAccount}
              disabled={loading}
            >
              {loading ? "Closing..." : "Close Account"}
            </button>

            <button
              type="button"
              className="form-cancel-btn"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
