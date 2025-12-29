export default function AccountVerify({
  label,
  accountNumber,
  setAccountNumber,
  disabled,
}) {
  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">{label} Account Number</label>
        <input
          type="text"
          className="form-input"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
