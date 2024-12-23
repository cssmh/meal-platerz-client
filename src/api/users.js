import axiosSecure from ".";

export const addUser = async (userData) => {
  const { data } = await axiosSecure.post("/add-user", userData);
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