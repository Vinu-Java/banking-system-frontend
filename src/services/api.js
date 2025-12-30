import api from "./apiClient";
import { getUser } from "./auth";

export const loginUser = async (loginData) => {
  const response = await api.post("/login", loginData);
  // console.log(response.data);
  return response.data;
};

export const getBankDetails = async () => {
  const response = await api.get("/admin/bank-details");
  return response.data;
};

export const getProfile = async () => {
  const user = getUser();
  // console.log(user);
  if (!user || !user.userId) {
    throw new Error("SESSION_EXPIRED");
  }
  const response = await api.get(`/user/${user.userId}`);
  return response.data;
};

export const getBalance = async (accountNumber, password) => {
  const res = await api.post("/account/balance", {
    accountNumber,
    password,
  });
  return res.data;
};

export const createAccount = async (payload) => {
  const response = await api.post("/admin/create", payload);
  // console.log("API: " , response.data);
  return response.data;
};

export const getAccountByAccountNumber = async (accountNumber) => {
  const res = await api.post("/admin/validate", {accountNumber});
  return res.data;
};

export const updateAccount = async (payload) => {
  const res = await api.put("/admin/update", payload);
  return res.data;
};

export const closeAccount = (accountNumber) => {
  return api.delete(`/admin/close/${accountNumber}`);
};

export const depositAmount = async (payload) => {
  const res = await api.post("/admin/deposit", payload);
  return res.data;
};

export const withdrawAmount = (payload) => {
  return api.post("/admin/withdraw", payload);
};

export const transferAmount = (payload) => {
  return api.post("/admin/transfer", payload);
};

export const getAllTransactionsByDate = async (payload) => {
  const res = await api.post("/transaction/search/all", payload);
  return res.data;
};

export const getAllTransactionsByType = async (payload) => {
  const res = await api.post("/transaction/search/by-type", payload);
  return res.data;
};

