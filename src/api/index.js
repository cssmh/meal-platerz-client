import axios from "axios";
import { clearCookie, userLogout } from "./Auth";
import { toast } from "sonner";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("Error in the interceptor", error);
    if (error.response.status === 401 || error.response.status === 403) {
      await clearCookie();
      toast.error(
        "Your Session has expired! Please log in again."
      );
      await userLogout();
      history.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
