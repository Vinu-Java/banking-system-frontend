import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAccountByAccountNumber, withdrawAmount } from "../../services/api";
import "../../styles/forms.css";

export default function Withdraw() {
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
      toast.success("Account verified successfully");
    } catch {
      toast.error("Invalid account number");
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid withdrawal amount");
      return;
    }

    if (Number(amount) > account.balance) {
      toast.error("Withdrawal amount cannot exceed current balance");
      return;
    }

    setLoading(true);

    try {
      const { data } = await withdrawAmount({
        accountNumber,
        amount: Number(amount),
      });

      toast.success(`₹${data.withdrawnAmount} withdrawn successfully`);
      navigate("/manager/dashboard", { replace: true });
      // setAccount((prev) => ({
      //   ...prev,
      //   balance: data.currentBalance,
      // }));

      // setAmount("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Withdraw Amount</h2>

      {!account && (
        <div className="form">
          <div className="form-group">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-input"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="form-submit-btn" onClick={fetchAccount}>
              Verify Account
            </button>

            <button
              type="button"
              className="form-cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {account && (
        <form className="form" onSubmit={handleWithdraw}>
          <div className="form-group">
            <label className="form-label">Account Holder</label>
            <input
              type="text"
              className="form-input"
              value={account?.name ?? ""}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Type</label>
            <input
              type="text"
              className="form-input"
              value={account?.type ?? ""}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <input
              type="text"
              className="form-input"
              value={account?.status ?? ""}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Balance</label>
            <input
              type="text"
              className="form-input"
              value={account?.balance ?? ""}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Withdraw Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max={account.balance}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="form-submit-btn danger"
              disabled={loading}
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>

            <button
              type="button"
              className="form-cancel-btn"
              onClick={() => navigate("/dashboard")}
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
