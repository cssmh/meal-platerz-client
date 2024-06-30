import axios from "axios";
import { clearCookie } from "./Auth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
// Intercept response and check for unauthorized responses.
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error in the interceptor", error.response.status);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await clearCookie();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
