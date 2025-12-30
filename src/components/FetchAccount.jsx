import "../styles/forms.css";

export default function AccountFetchForm({
  accountNumber,
  setAccountNumber,
  onFetch,
  onCancel,
}) {
  return (
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
        <button className="form-submit-btn" onClick={onFetch}>
          Fetch Details
        </button>

        <button type="button" className="form-cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
