import axiosSecure from ".";

export const paymentIntent = async (price) => {
  const { data } = await axiosSecure.post("/create-payment-intent", { price });
  return data;
};
