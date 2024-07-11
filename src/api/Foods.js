import axiosSecure from ".";

export const getAllFoods = async (page, limit, searchTerm) => {
  const { data } = await axiosSecure(
    `/allFoods?page=${page}&limit=${limit}&search=${searchTerm}`
  );
  return data;
};

export const getFeaturedFoods = async () => {
  const { data } = await axiosSecure("/featured-foods");
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

export const updateMyFoods = async (id, email, updatedData) => {
  const { data } = await axiosSecure.put(
    `/update-food/${id}/${email}`,
    updatedData
  );
  return data;
};

// add food
export const addFood = async (foodInfo) => {
  const { data } = await axiosSecure.post("/add-food", foodInfo);
  return data;
};

// add req
export const addReq = async (reqInfo) => {
  const { data } = await axiosSecure.post("/add-request", reqInfo);
  return data;
};

// get single food
export const getFood = async (idx) => {
  const { data } = await axiosSecure(`food/${idx}`);
  return data;
};

// get my pending
export const getMyPending = async (idx, email) => {
  const { data } = await axiosSecure(`/pending-request/${idx}/${email}`);
  return data;
};

// update food status myPendingCard
export const updateFoodStatus = async (idx, foodStatus) => {
  const { data } = await axiosSecure.put(`/food-status/${idx}`, { foodStatus });
  return data;
};

export const updateRequestedStatus = async (idx, updatedStatus) => {
  const { data } = await axiosSecure.put(
    `/requested-status/${idx}`,
    updatedStatus
  );
  return data;
};

export const addTime = async (idx, todayDateTime) => {
  const { data } = await axiosSecure.put(`/add-time/${idx}`, {
    todayDateTime,
  });
  return data;
};
// update food status myPendingCard end

export const unavailableId = async (email) => {
  const { data } = await axiosSecure(`/unavailable-ids?email=${email}`);
  return data;
};

// add review on separate food
export const addReviews = async (id, email, review) => {
  const { data } = await axiosSecure.put(`/add-review/${id}/${email}`, {
    review,
  });
  return data;
};

// add review on website
export const addReviewAsClient = async (reviewData) => {
  const { data } = await axiosSecure.post("/add-review", reviewData);
  return data;
};

// delete review on website
export const deleteReviewAsClient = async (id, email) => {
  const { data } = await axiosSecure.delete(`/review?id=${id}&email=${email}`);
  return data;
};

// get client say
export const getClientSays = async (limit, sort) => {
  const { data } = await axiosSecure(
    `/all-reviews?limit=${limit}&sort=${sort}`
  );
  return data;
};
