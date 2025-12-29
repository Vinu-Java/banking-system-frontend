// Check if user is logged in
export const isLoggedIn = () => {
  return localStorage.getItem("user") !== null;
};

// Get full user object
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role; // "USER" or "MANAGER"
};

// Get account number (if needed)
export const getAccountNumber = () => {
  const user = getUser();
  return user?.accountNumber;
};

// Logout
export const logout = () => {
  localStorage.removeItem("user");
};
