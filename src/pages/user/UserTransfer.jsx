import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getAccountByAccountNumber,
  transferAmount,
} from "../../services/api";
import { getAccountNumber } from "../../services/auth";
import "../../styles/forms.css";

export default function UserTransfer() {
  const navigate = useNavigate();

  const [fromAccount, setFromAccount] = useState(null);
  const [toAcc, setToAcc] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD USER ACCOUNT ================= */
  useEffect(() => {
    const loadAccount = async () => {
      try {
        const accNo = getAccountNumber();

        if (!accNo) {
          toast.error("Session expired. Please login again");
          navigate("/login");
          return;
        }

        const data = await getAccountByAccountNumber(accNo);

        if (data.status !== "ACTIVE") {
          toast.error("Your account is not active");
          return;
        }

        setFromAccount(data);
      } catch {
        toast.error("Unable to load your account");
      }
    };

    loadAccount();
  }, [navigate]);

  /* ================= TRANSFER ================= */
  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!fromAccount) return;

    setLoading(true);

    try {
      const toAccount = await getAccountByAccountNumber(toAcc);

      if (toAccount.status !== "ACTIVE") {
        toast.error("Destination account is not active");
        return;
      }

      await transferAmount({
        fromAccountNumber: fromAccount.accountNumber,
        toAccountNumber: toAcc,
        amount: Number(amount),
      });

      toast.success(`₹${amount} successfully transferred to ${toAccount.name}`);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="page">
      <h2 className="page-title">Transfer Amount</h2>

      <form className="form" onSubmit={handleTransfer}>

        <div className="form-group">
          <label className="form-label">Send To (Account Number)</label>
          <input
            type="text"
            className="form-input"
            value={toAcc}
            placeholder="Enter 10-digit account number"
            onChange={(e) => {
              if (/^\d{0,10}$/.test(e.target.value)) {
                setToAcc(e.target.value);
              }
            }}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-input"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="form-submit-btn"
            disabled={
              loading || toAcc.length !== 10 || !amount || Number(amount) <= 0
            }
          >
            {loading ? "Transferring..." : "Transfer"}
          </button>

          <button
            type="button"
            className="form-cancel-btn"
            onClick={() => navigate("/dashboard", { replace: true })}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
