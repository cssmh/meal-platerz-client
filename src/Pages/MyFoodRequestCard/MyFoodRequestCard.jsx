const MyFoodRequestCard = ({ getFoods }) => {
  console.log(getFoods);
  const {
    food_id,
    donator_name,
    pickup_location,
    expired_date,
    expired_time,
    request_date,
    donation_money,
  } = getFoods;

  return (
    <div>
      <div>
        <h1>{donator_name}</h1>
        <p>{pickup_location}</p>
        <p>{expired_date}</p>
        <p>{expired_time}</p>
        <p>{request_date}</p>
        <p>{donation_money}</p>
      </div>
    </div>
  );
};

export default MyFoodRequestCard;
