import axios from "axios";
import { clearCookie } from "./Auth";
import { useContext } from "react";
import { AuthContext } from "../Shared/AuthProviders";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
// Intercept response and check for unauthorized responses.
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error in the interceptor", error.response.status);
    if (error.response.status === 401 || error.response.status === 403) {
      await clearCookie();
      const { logOut } = useContext(AuthContext);
      await logOut();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
