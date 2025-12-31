import { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/forms.css";
import { getBalanceByManager } from "../../services/api";

export default function ManagerBalanceEnquiry() {
  const [accountNumber, setAccountNumber] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckBalance = async () => {
    if (!accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }

    setLoading(true);
    setBalanceData(null);

    try {
      const data = await getBalanceByManager(accountNumber);

      if (data.status === "BLOCKED") {
        toast.error("This account is blocked");
        return;
      }

      if (data.status === "CLOSED") {
        toast.error("This account is closed");
        return;
      }

      toast.success("Balance fetched successfully");
      setBalanceData(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Account not found");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAccountNumber("");
    setBalanceData(null);
  };

  return (
    <div className="page">
      <h2 className="page-title">Balance Enquiry</h2>

      <div className="form">
        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter user account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            className="form-submit-btn"
            onClick={handleCheckBalance}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Balance"}
          </button>

          <button
            className="form-cancel-btn"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>

        {balanceData && (
          <div className="verified-box">
            <span className="verified-label">Current Balance</span>
            <span className="verified-sub">
              ₹ {balanceData.balance.toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
