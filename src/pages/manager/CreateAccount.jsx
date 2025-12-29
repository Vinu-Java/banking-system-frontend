import { useState } from "react";
import { createAccount } from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/forms.css";
import { replace, useNavigate } from "react-router-dom";

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
      await createAccount({
        ...form,
        initialBalance: Number(form.initialBalance || 0),
      });

      toast.success("Account created successfully");
      setForm(INITIAL_FORM);
      navigate("/manager/dashboard", replace);
    } catch (err) {
      console.error(err);

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
    setForm(INITIAL_FORM);
    setLoading(false);
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
            placeholder="Enter full name"
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
            placeholder="Enter email"
            required
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
            placeholder="10 digit phone number"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            required
          />
        </div>

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

        <div className="form-group">
          <label className="form-label">Initial Balance</label>
          <input
            type="number"
            name="initialBalance"
            className="form-input"
            value={form.initialBalance}
            onChange={handleChange}
            placeholder="0 or more"
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
