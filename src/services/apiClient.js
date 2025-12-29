import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error
    if (!error.response) {
      return Promise.reject({
        message: "Unable to connect to server. Please try again later.",
      });
    }

    return Promise.reject(error.response.data);
  }
);

export default api;
