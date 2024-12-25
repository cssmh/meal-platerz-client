import moment from "moment";
import { Link } from "react-router-dom";
import useIsExpire from "../hooks/useIsExpire";
import { FaMapMarkerAlt } from "react-icons/fa";

const FoodsCard = ({ getFoods }) => {
  const {
    _id,
    food_image,
    food_name,
    donator_image,
    donator_name,
    food_quantity,
    pickup_location,
    expiration_date,
    expiration_time,
    food_status,
  } = getFoods;

  const isExpired = useIsExpire(expiration_date, expiration_time);
  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");

  return (
    <div className="flex flex-col bg-white shadow-lg md:rounded-lg overflow-hidden">
      <div
        data-aos="zoom-out-down"
        data-aos-duration="500"
        className="relative"
      >
        <img
          alt={food_name}
          src={food_image}
          className="w-full h-60 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={`absolute top-2 right-2 text-xs font-semibold py-1 px-2 rounded-md ${
            food_status === "Unavailable"
              ? "bg-emerald-600"
              : isExpired
              ? "bg-red-600"
              : ""
          } text-white`}
        >
          {food_status === "Unavailable"
            ? "Delivered"
            : isExpired
            ? "Expired"
            : null}
        </div>
      </div>
      <div className="py-2 px-3 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {food_name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Quantity: {food_quantity} person{food_quantity > 1 ? "s" : ""}
          </p>
          <p
            className={`text-sm mt-1 ${
              food_status === "Unavailable"
                ? "text-emerald-500"
                : isExpired
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {food_status === "Unavailable"
              ? "This food item has been successfully delivered on time."
              : `Expires on: ${expireIn} at ${expiration_time}`}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <img
            className="w-10 h-10 rounded-full object-cover mr-2 border-2 border-red-500"
            src={donator_image}
            alt={donator_name}
          />
          <div className="text-sm">
            <p className="text-gray-800 font-semibold">{donator_name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <FaMapMarkerAlt className="mr-1 text-red-500" /> {pickup_location}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <Link
          to={`/food/${_id}`}
          className="block text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodsCard;
