import { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/forms.css";
import { getBalance } from "../../services/api";
import { getAccountNumber } from "../../services/auth"; 

export default function BalanceEnquiry() {
  const [password, setPassword] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckBalance = async () => {
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    const accountNumber = getAccountNumber(); // 👈 from auth

    if (!accountNumber) {
      toast.error("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    setBalanceData(null);

    try {
      const data = await getBalance(accountNumber, password);

      if (data.status === "BLOCKED") {
        toast.error("Your account is blocked. Contact bank support.");
        return;
      }

      toast.success("Balance fetched successfully");
      setBalanceData(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid password");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPassword("");
    setBalanceData(null);
  };

  return (
    <div className="page">
      <h2 className="page-title">Balance Enquiry</h2>

      <div className="form">
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <span className="verified-label">Available Balance</span>
            <span className="verified-sub">
              ₹ {balanceData.balance.toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
