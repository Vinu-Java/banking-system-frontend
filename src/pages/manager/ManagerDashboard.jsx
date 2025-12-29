import { useEffect, useState } from "react";
import { getBankDetails } from "../../services/api";
import "../../styles/ManagerDashboard.css";

export default function ManagerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const res = await getBankDetails();
      setData(res); 
    } catch (error) {
      console.error("Failed to fetch bank details", error);
    }
  };

  if (!data) {
    return <p className="manager-dashboard">Loading dashboard...</p>;
  }

  return (
    <div className="manager-dashboard">

      <div className="manager-header">
        <h2>Manager Dashboard</h2>
        <p>Bank Overview & Management</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <h4>Total Accounts</h4>
          <p>{data.totalAccounts}</p>
        </div>

        <div className="stat-card success">
          <h4>Total Balance</h4>
          <p>₹ {data.totalBalance.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Today Transactions</h4>
          <p>{data.todayTransactions}</p>
        </div>

        <div className="stat-card success">
          <h4>Today Deposits</h4>
          <p>₹ {data.todayDeposits.toLocaleString()}</p>
        </div>

        <div className="stat-card danger">
          <h4>Today Withdrawals</h4>
          <p>₹ {data.todayWithdrawals.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h4>Savings Accounts</h4>
          <p>{data.savingsAccounts}</p>
        </div>

        <div className="stat-card">
          <h4>Current Accounts</h4>
          <p>{data.currentAccounts}</p>
        </div>

        <div className="stat-card success">
          <h4>Active Accounts</h4>
          <p>{data.activeAccounts}</p>
        </div>

        <div className="stat-card danger">
          <h4>Blocked Accounts</h4>
          <p>{data.blockedAccounts}</p>
        </div>
      </div>
    </div>
  );
}
