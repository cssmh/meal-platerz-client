import axiosSecure from ".";

export const addUser = async (userData) => {
  const { data } = await axiosSecure.put("/add-user", userData);
  return data;
};

export const checkAdmin = async (email) => {
  const { data } = await axiosSecure.get(`/isadmin/${email}`);
  return data;
};

export const getSingleUser = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data;
};

export const getUserData = async (email) => {
  const { data } = await axiosSecure(`/user-data?email=${email}`);
  return data;
};

export const getPremiumTimer = async () => {
  const { data } = await axiosSecure("/premium-time");
  return data;
};

export const updatePremiumTime = async (days) => {
  const { data } = await axiosSecure.post("/update-premium-time", { days });
  return data;
};