import { useState } from "react";
import { toast } from "react-toastify";
import { replace, useNavigate } from "react-router-dom";
import { getAccountByAccountNumber, updateAccount } from "../../services/api";
import "../../styles/forms.css";

export default function UpdateUserProfile() {
  const [accountNumber, setAccountNumber] = useState("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Fetch account details
  const fetchAccount = async () => {
    if (!accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }

    if (accountNumber.length != 10) {
      toast.error("Invalid account number");
      return;
    }

    try {
      console.log(accountNumber);
      const data = await getAccountByAccountNumber(accountNumber);

      setForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      setFetched(true);
    } catch (err) {
      toast.error("Incorrect account number");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Update account
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await updateAccount({
        accountNumber,
        ...form,
      });

      toast.success("Profile updated successfully");
      navigate("/dashboard", replace);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAccountNumber("");
    setLoading(false);
    navigate("/manager/dashboard", { replace: true });
  };

  return (
    <div className="page">
      <h2 className="page-title">Update User Profile</h2>

      {!fetched && (
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
              Fetch Details
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

      {fetched && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-input"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="form-submit-btn"
              // disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              className="form-cancel-btn"
              disabled={loading}
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
