import { useState } from "react";
import { toast } from "react-toastify";
import { getAccountByAccountNumber, depositAmount } from "../../services/api";
import "../../styles/forms.css";
import { replace, useNavigate } from "react-router-dom";

export default function Deposit() {
  const [accountNumber, setAccountNumber] = useState("");
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    if (!accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }

    try {
      const data = await getAccountByAccountNumber(accountNumber);

      if (data.status !== "ACTIVE") {
        toast.error(`Account is ${data.status}`);
        return;
      }

      setAccount(data);
    } catch (err) {
      toast.error("Invalid account number");
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid deposit amount");
      return;
    }

    setLoading(true);

    try {
      const response = await depositAmount({
        accountNumber,
        amount: Number(amount),
      });

      toast.success(`₹${response.depositedAmount} deposited successfully`);

      setAccount((prev) => ({
        ...prev,
        balance: response.currentBalance,
      }));

      setAmount("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAccount(null);
    setAccountNumber("");
    setAmount("");
    setLoading(false);
    navigate("/manager/dashboard", { replace: true });
  };

  return (
    <div className="page">
      <h2 className="page-title">Deposit Amount</h2>

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
        <form className="form" onSubmit={handleDeposit}>
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
            <label className="form-label">Current Balance</label>
            <input
              type="text"
              className="form-input"
              value={account.balance}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Deposit Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="form-submit-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Deposit"}
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
        </form>
      )}
    </div>
  );
}
