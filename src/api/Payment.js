import axiosSecure from ".";

export const paymentIntent = async (price) => {
  const { data } = await axiosSecure.post("/create-payment-intent", { price });
  return data;
};

export const addPremiumDate = async (email, updatedUserData) => {
  const { data } = await axiosSecure.patch(
    `/add-user-membership/${email}`,
    updatedUserData
  );
  return data;
};
