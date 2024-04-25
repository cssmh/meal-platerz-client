const MyFoodRequestCard = ({ getFoods, handleRequestedDelete }) => {
  const {
    _id,
    food_id,
    food_name,
    food_image,
    donator_email,
    donator_name,
    donator_phone,
    user_email,
    user_phone,
    request_date,
    pickup_location,
    expired_date,
    expired_time,
    donation_money,
    status,
  } = getFoods;

  return (
    <div className="border border-redFood rounded-md mx-1 lg:mx-0 py-5">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
        <div className="space-y-1 text-center">
          <img src={food_image} className="w-64 mx-auto" alt="food" />
        </div>
        <div>
          <p className="text-2xl">{food_name}</p>
          <p className="text-lg text-blue-900">Donar Information</p>
          <h1>{donator_name}</h1>
          <p>{donator_email}</p>
          <p>{donator_phone}</p>
        </div>
      </div>
      <div className="px-[70px] mt-2">
        <p>Pickup Location: {pickup_location}</p>
        <p>
          Expire Date Time: {expired_date} {expired_time}
        </p>
        <p>Your Request Date: {request_date}</p>
        <p>Your Donation: {donation_money} BDT</p>
        <p>
          Status:{" "}
          <span
            className={status === "Pending" ? "text-redFood" : "text-green-500"}
          >
            {status}
          </span>
        </p>
        {status !== "Delivered" && (
          <button onClick={() => handleRequestedDelete(_id, food_name)} className="mt-1 btn btn-sm border-black bg-base-100 hover:bg-black text-black hover:text-white">
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequestCard;
