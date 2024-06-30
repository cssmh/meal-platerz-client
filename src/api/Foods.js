import axiosSecure from ".";

// Fetch all foods from db
export const getAllFoods = async () => {
  const { data } = await axiosSecure("/allFoods");
  return data;
};

export const getMyFoods = async (email) => {
  const { data } = await axiosSecure(`/myFoods?email=${email}`);
  return data;
};

export const deleteMyFood = async (email, id) => {
  const { data } = await axiosSecure.delete(`/delete-food/${email}/${id}`);
  return data;
};

export const getMyRequests = async (email) => {
  const { data } = await axiosSecure(`/my-requested?email=${email}`);
  return data;
};

export const deleteMyRequest = async (email, id) => {
  const { data } = await axiosSecure.delete(`/my-request/${email}/${id}`);
  return data;
};

export const updateMyFood = async (id, email, updatedData) => {
  const { data } = await axiosSecure.put(
    `/update-food/${id}/${email}`,
    updatedData
  );
  return data;
};
