import { useState } from "react";
import { createAccount } from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/forms.css";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  password: "",
  accountType: "",
  initialBalance: "",
};

export default function CreateAccount() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.accountType
    ) {
      toast.error("Please fill all required fields");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await createAccount({
        ...form,
        name: form.name?.trim().toUpperCase(),
        email: form.email?.trim().toLowerCase(),
        initialBalance: Number(form.initialBalance || 0),
      });

      toast.success("Account created successfully");

      // navigate to account details page with created account data
      navigate(`/account-details/${response.accountNumber}`, {
        replace: true,
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create account";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/manager/dashboard", { replace: true });
  };

  return (
    <div className="page">
      <h2 className="page-title">Create New Account</h2>

      <form className="form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
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
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-input"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Account Type */}
        <div className="form-group">
          <label className="form-label">Account Type</label>
          <select
            name="accountType"
            className="form-input"
            value={form.accountType}
            onChange={handleChange}
            required
          >
            <option value="">Select account type</option>
            <option value="SAVINGS">Savings</option>
            <option value="CURRENT">Current</option>
          </select>
        </div>

        {/* Initial Balance */}
        <div className="form-group">
          <label className="form-label">Initial Balance</label>
          <input
            type="number"
            name="initialBalance"
            className="form-input"
            value={form.initialBalance}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          <button
            type="button"
            className="form-cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
