import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const role = JSON.parse(user).role;
      navigate(role === "MANAGER" ? "/manager/dashboard" : "/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!accountNumber || !password) {
      toast.error("Account number and password are required");
      return;
    }

    if (accountNumber.length !== 10 || !password.trim()) {
      toast.error("Incorrect account number or password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({ accountNumber, password });

      // ✅ STORE USER AS SINGLE OBJECT
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          userName: data.userName,
          accountNumber: data.accountNumber,
          role: data.role,
        })
      );

      toast.success("Login successful");

      // ✅ USE DATA (not undefined user)
      if (data.role === "MANAGER") {
        navigate("/manager/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err?.message) {
        toast.error(err.message);
      } else if (typeof err === "object") {
        Object.values(err).forEach((msg) => toast.error(msg));
      } else {
        toast.error("Login failed. Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="number"
            placeholder="Account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>Don't have an account? Contact bank manager.</p>
      </div>
    </div>
  );
}
