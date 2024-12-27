import { getAuth, signOut } from "firebase/auth";
import axiosSecure from ".";
import app from "../Shared/firebase.config";
const auth = getAuth(app);

export const userLogout = async () => {
  return await signOut(auth);
};

export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  // console.log("logout user", data);
  return data;
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  // console.log("login user", data);
  return data;
};
