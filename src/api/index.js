import axios from "axios";
import { clearCookie, userLogout } from "./Auth";
import { toast } from "sonner";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
// Intercept response and check for unauthorized responses.
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("Error in the interceptor", error.response.status);
    if (error.response.status === 401 || error.response.status === 403) {
      await clearCookie();
      toast.warning(
        "Your Session has expired! Please log in again to continue"
      );
      await userLogout();
      history.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
