import axiosSecure from ".";

export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  // console.log("logout user", data);
  return data;
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", email);
  // console.log("login user", data);
  return data;
};
