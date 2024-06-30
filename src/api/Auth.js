import axiosSecure from ".";

export const clearCookie = async () => {
  const { data } = await axiosSecure.post("/logout");
  return data;
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", email);
  return data;
};
