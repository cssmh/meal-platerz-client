import moment from "moment";
import { Link } from "react-router-dom";
import useIsExpire from "../../hooks/useIsExpire";

const FoodsCard = ({ getFoods, aosDuration }) => {
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
    donator_phone,
  } = getFoods;

  const isExpired = useIsExpire(expiration_date, expiration_time);
  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");

  return (
    <div
      data-aos="fade-up"
      data-aos-duration={aosDuration}
      data-aos-anchor-placement="center-bottom"
      className="group flex flex-col bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          alt={food_name}
          src={food_image}
          className="w-full h-48 object-cover"
        />
        {isExpired && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-md">
            Expired
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {food_name}
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Quantity: {food_quantity} person{food_quantity > 1 ? "s" : ""}
          </p>
          <p
            className={`text-sm mt-1 ${
              isExpired ? "text-red-500" : "text-gray-500"
            }`}
          >
            Expires on: {expireIn} at {expiration_time}
          </p>
          <p className="text-sm text-gray-600 mt-2">Phone: {donator_phone}</p>
        </div>
        <div className="flex items-center mt-4">
          <img
            className="w-10 h-10 rounded-full object-cover mr-3"
            src={donator_image}
            alt={donator_name}
          />
          <div className="text-sm">
            <p className="text-gray-800 font-semibold">{donator_name}</p>
            <p className="text-gray-500">Location: {pickup_location}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-100 border-t border-gray-200">
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
