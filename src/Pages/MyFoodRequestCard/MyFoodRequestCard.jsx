const MyFoodRequestCard = ({ getFoods }) => {
  const {
    _id,
    food_id,
    food_name,
    food_image,
    donator_email,
    donator_name,
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
    <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
      <div>
        <p>{food_name}</p>
        <img src={food_image} className="w-60" alt="food" />
      </div>
      <div>
        <h1>Donar: {donator_name}</h1>
        <p>Pickup Location: {pickup_location}</p>
        <p>
          Expire Date Time: {expired_date} {expired_time}
        </p>
        <p>Your Request Date: {request_date}</p>
        <p>Your Donation: {donation_money} BDT</p>
        <p>Status <span className="text-redFood">{status}</span></p>
        <button className="mt-1 btn btn-sm border-black bg-base-100 hover:bg-black text-black hover:text-white">
          Cancel Request
        </button>
      </div>
    </div>
  );
};

export default MyFoodRequestCard;
