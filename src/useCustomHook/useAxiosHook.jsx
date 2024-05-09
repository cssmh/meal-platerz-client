import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useContextHook from "./useContextHook";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosHook = () => {
  const { logOut } = useContextHook();
  const navigateTo = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
            .then(() => {
              toast.error("authorization error, login again!");
              navigateTo("/login");
            })
            .catch();
        }
      }
    );
  }, [logOut, navigateTo]);

  return { axiosSecure };
};

export default useAxiosHook;
