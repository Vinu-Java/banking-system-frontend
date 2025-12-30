import "../styles/forms.css";

export default function AccountUpdateForm({
  accountNumber,
  form,
  onChange,
  onSubmit,
  loading,
  onCancel,
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="verified-box">
        <span className="verified-label">Account Number</span>
        <span className="verified-sub">{accountNumber}</span>
      </div>

      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-input"
          value={form.name}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className="form-input"
          value={form.email}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Phone</label>
        <input
          name="phone"
          className="form-input"
          value={form.phone}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Account Status</label>
        <select
          name="status"
          className="form-input"
          value={form.status}
          onChange={onChange}
        >
          <option value="">Select status</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="BLOCKED">BLOCKED</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Account Type</label>
        <select
          name="type"
          className="form-input"
          value={form.type}
          onChange={onChange}
        >
          <option value="">Select type</option>
          <option value="SAVINGS">SAVINGS</option>
          <option value="CURRENT">CURRENT</option>
          <option value="STUDENT">STUDENT</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="form-submit-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>

        <button
          type="button"
          className="form-cancel-btn"
          disabled={loading}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
