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
    <div className="flex flex-col shadow-lg rounded-lg bg-white hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="flex-grow">
        <img
          alt="Food"
          src={food_image}
          className="w-full rounded-2xl h-[200px] md:h-48 object-cover object-center p-3"
        />
        <div className="px-3 text-left flex-1">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {food_name}
            </h3>
            <p className="text-sm text-gray-600">
              Quantity for {food_quantity} person
            </p>
            <p className="text-sm text-gray-600 mt-1 truncate">
              Expires in {expired_date} {expired_time}
            </p>
            <p className="text-sm text-gray-600 mt-1 truncate">
              Phone: {donator_phone}
            </p>
          </div>
          <Link
            to={`/food/${_id}`}
            className="inline-block bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="p-2 flex justify-between items-center bg-gray-100 gap-1 mt-2">
        <div className="flex items-center justify-center gap-1">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={donator_image}
            alt="donator"
          />
          <p className="text-sm text-gray-800 truncate">{donator_name}</p>
        </div>
        <p className="text-xs text-gray-600 truncate">
          Location: <span className="text-redFood">{pickup_location}</span>
        </p>
      </div>
    </div>
  );
};

export default FeaturedFoodsCard;
