import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getAccountByAccountNumber,
  transferAmount,
} from "../../services/api";
import AccountVerify from "../../components/AccountVerify";
import VerifiedAccount from "../../components/VerifiedAccount";
import "../../styles/forms.css";

export default function Transfer() {
  const [fromAcc, setFromAcc] = useState("");
  const [toAcc, setToAcc] = useState("");
  const [fromAccount, setFromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= CANCEL ================= */
  const handleCancel = () => {
    setFromAcc("");
    setToAcc("");
    setFromAccount(null);
    setToAccount(null);
    setAmount("");
    navigate("/manager/dashboard", { replace: true });
  };

  /* ================= VERIFY SOURCE ================= */
  const verifyFromAccount = async () => {
    if (!fromAcc.trim()) {
      toast.error("Source account number required");
      return;
    }

    try {
      const data = await getAccountByAccountNumber(fromAcc.trim());

      if (data.status !== "ACTIVE") {
        toast.error("Source account is not active");
        return;
      }

      setFromAccount(data);
      toast.success("Source account verified");
    } catch {
      toast.error("Invalid source account");
    }
  };

  /* ================= VERIFY DESTINATION ================= */
  const verifyToAccount = async () => {
    if (!toAcc.trim()) {
      toast.error("Destination account number required");
      return;
    }

    if (toAcc.trim() === fromAcc.trim()) {
      toast.error("Source and destination accounts cannot be same");
      return;
    }

    try {
      const data = await getAccountByAccountNumber(toAcc.trim());

      if (data.status !== "ACTIVE") {
        toast.error("Destination account is not active");
        return;
      }

      setToAccount(data);
      toast.success("Destination account verified");
    } catch {
      toast.error("Invalid destination account");
    }
  };

  /* ================= TRANSFER ================= */
  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!fromAccount || !toAccount) {
      toast.error("Please verify both accounts first");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid transfer amount");
      return;
    }

    if (Number(amount) > fromAccount.balance) {
      toast.error("Insufficient balance");
      return;
    }

    setLoading(true);

    try {
      await transferAmount({
        fromAccountNumber: fromAcc.trim(),
        toAccountNumber: toAcc.trim(),
        amount: Number(amount),
      });

      toast.success("Transfer completed successfully");
      handleCancel();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Transfer Amount</h2>

      <AccountVerify
        label="Source"
        accountNumber={fromAcc}
        setAccountNumber={setFromAcc}
        disabled={!!fromAccount}
      />

      {!fromAccount && (
        <div className="form-actions">
          <button
            type="button"
            className="form-submit-btn"
            onClick={verifyFromAccount}
          >
            Verify Source
          </button>

          <button
            type="button"
            className="form-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}

      {fromAccount && (
        <VerifiedAccount
          title="Source Account Holder"
          name={fromAccount.name}
          balance={fromAccount.balance}
        />
      )}

      {fromAccount && (
        <>
          <AccountVerify
            label="Destination"
            accountNumber={toAcc}
            setAccountNumber={setToAcc}
            disabled={!!toAccount}
          />

          {!toAccount && (
            <div className="form-actions">
              <button
                type="button"
                className="form-submit-btn"
                onClick={verifyToAccount}
              >
                Verify Destination
              </button>

              <button
                type="button"
                className="form-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {toAccount && (
        <VerifiedAccount
          title="Destination Account Holder"
          name={toAccount.name}
        />
      )}

      {fromAccount && toAccount && (
        <form className="form" onSubmit={handleTransfer}>
          <div className="form-group">
            <label className="form-label">Transfer Amount</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="100"
              max={fromAccount.balance}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="form-submit-btn"
              disabled={loading}
            >
              {loading ? "Transferring..." : "Transfer"}
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
