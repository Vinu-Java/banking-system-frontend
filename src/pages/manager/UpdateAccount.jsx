import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAccountByAccountNumber, updateAccount } from "../../services/api";

import FetchAccount from "../../components/FetchAccount";
import EditAccount from "../../components/EditAccount";
import "../../styles/forms.css";

export default function UpdateUserProfile() {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    type: "",
  });

  const fetchAccount = async () => {
    if (!accountNumber || accountNumber.length !== 10) {
      toast.error("Invalid account number");
      return;
    }

    try {
      const res = await getAccountByAccountNumber(accountNumber);
      const account = res || res.data;

      setForm({
        name: account.name,
        email: account.email,
        phone: account.phone,
        status: account.status,
        type: account.type,
      });

      setFetched(true);
    } catch {
      toast.error("Account not found");
    }
  };

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateAccount({ accountNumber, ...form });
      toast.success("Profile updated");
      navigate(`/account-details/${accountNumber}`, { replace: true });
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2 className="page-title">Update User Profile</h2>

      {!fetched ? (
        <FetchAccount
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          onFetch={fetchAccount}
          onCancel={() => navigate("/manager/dashboard", { replace: true })}
        />
      ) : (
        <EditAccount
          accountNumber={accountNumber}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={() => navigate("/manager/dashboard", { replace: true })}
        />
      )}
    </div>
  );
}
