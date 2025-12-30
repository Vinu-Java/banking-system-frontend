import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import MainLayout from "./layout/MainLayout";

import UserDashboard from "./pages/user/UserDashboard";
import UserTransactions from "./pages/user/UserTransactions";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import CreateAccount from "./pages/manager/CreateAccount";
import UpdateAccount from "./pages/manager/UpdateAccount";
import Deposit from "./pages/manager/Deposit";
import CloseAccount from "./pages/manager/CloseAccount";
import Withdraw from "./pages/manager/Withdraw";
import Transfer from "./pages/manager/MoneyTransfer";
import Transactions from "./pages/manager/Transactions";
import BalanceEnquiry from "./pages/user/BalanceEnquiry";
import AccountDetails from "./pages/manager/AccountDetails";
import UserTransfer from "./pages/user/UserTransfer";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover={true}
        closeOnClick={false}
        theme="colored"
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("user") ? (
                JSON.parse(localStorage.getItem("user")).role === "MANAGER" ? (
                  <Navigate to="/manager/dashboard" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={["USER"]} />}>
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/balance-enquiry" element={<BalanceEnquiry />} />
                <Route path="/user-transfer" element={<UserTransfer />} />
                <Route path="/transactions" element={<UserTransactions />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={["MANAGER"]} />}>
              <Route element={<MainLayout />}>
                <Route
                  path="/manager/dashboard"
                  element={<ManagerDashboard />}
                />
                <Route
                  path="/account-details/:accountNumber"
                  element={<AccountDetails />}
                />
                <Route path="/account/create" element={<CreateAccount />} />
                <Route path="/account/update" element={<UpdateAccount />} />
                <Route path="/account/close" element={<CloseAccount />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route
                  path="/manager/transactions"
                  element={<Transactions />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
