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
      className="group border border-gray-200 flex flex-col shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative flex justify-center bg-gray-50 p-4">
        <img
          alt="Food"
          src={food_image}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-white object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-grow p-3">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight">
          {food_name}
          {isExpired && (
            <span className="text-sm text-red-500 ml-2">(Expired)</span>
          )}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Quantity for {food_quantity} person{food_quantity > 1 ? "s" : ""}
        </p>
        <p
          className={`text-sm mt-1 ${
            isExpired ? "text-red-500" : "text-gray-600"
          }`}
        >
          Expires on: {expireIn} at {expiration_time}
        </p>
        <p className="text-sm text-gray-600 mt-2">Phone: {donator_phone}</p>
      </div>
      <div className="flex items-center justify-between p-3 bg-gray-100 border-t border-gray-200">
        <div className="flex items-center">
          <img
            className="w-9 h-9 rounded-full object-cover mr-1"
            src={donator_image}
            alt="donator"
          />
          <p className="text-sm text-gray-800">{donator_name},</p>
        </div>
        <p className="text-sm text-gray-600">
          Location: <span className="text-red-500">{pickup_location}</span>
        </p>
      </div>
      <div className="px-3 py-2">
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
