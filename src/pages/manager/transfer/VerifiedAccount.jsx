export default function VerifiedAccount({ title, name, balance }) {
  return (
    <div className="verified-box">
      <span className="verified-label">{title}</span>
      <strong>{name}</strong>
      {balance !== undefined && (
        <span className="verified-sub">Balance: ₹{balance}</span>
      )}
    </div>
  );
}
