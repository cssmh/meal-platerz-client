import axiosSecure from ".";

export const addUser = async (userData) => {
  const { data } = await axiosSecure.put("/add-user", userData);
  return data;
};

export const getSingleUser = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data;
};