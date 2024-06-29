import axiosSecure from ".";

// Fetch all foods from db
export const getAllFoods = async () => {
  const { data } = await axiosSecure("/allFoods");
  return data;
};
