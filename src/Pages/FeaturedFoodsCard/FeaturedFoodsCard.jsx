import { Link } from "react-router-dom";

const FeaturedFoodsCard = ({ getFoods }) => {
  const {
    _id,
    food_image,
    food_name,
    donator_image,
    donator_name,
    food_quantity,
    pickup_location,
    expired_date,
    expired_time,
    donator_phone,
  } = getFoods;

  return (
    <div className="max-w-md mx-auto">
      <div className="h-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
        <img
          className="px-1 md:px-0 md:w-[300px] md:h-48 mx-auto lg:mx-0 object-cover object-center"
          src={food_image}
          alt="Food"
        />
        <div className="p-4 text-left flex-1">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{food_name}</h3>
            <p className="text-sm text-gray-600">
              Quantity for {food_quantity} person
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Expire in {expired_date} {expired_time}
            </p>
            <p className="text-sm text-gray-600 mt-1">Phone: {donator_phone}</p>
          </div>
          <Link
            to={`/food/${_id}`}
            className="inline-block bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            View Details
          </Link>
        </div>
        <div className="flex justify-around items-center px-2 py-3 bg-gray-100 gap-1">
          <div className="flex items-center justify-center gap-1">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={donator_image}
              alt="donator"
            />
            <p className="text-sm text-gray-800">{donator_name}</p>
          </div>
          <p className="text-xs text-gray-600">
            Location: <span className="text-redFood">{pickup_location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFoodsCard;
