import moment from "moment";
import { Link } from "react-router-dom";

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
    donator_phone,
  } = getFoods;

  const expiredDateTime = moment(
    `${expiration_date} ${expiration_time}`,
    "YYYY-MM-DD hh:mm A"
  );
  const isExpired = moment().isAfter(expiredDateTime);
  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-anchor-placement="center-bottom"
      className="group border flex flex-col shadow-lg rounded-lg bg-white hover:scale-105 transition-all duration-300 overflow-hidden"
    >
      <div className="flex-grow">
        <img
          alt="Food"
          src={food_image}
          className="w-full h-[200px] md:h-48 object-cover object-center p-3 transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
        />
        <div className="px-3 text-left flex-1">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {food_name}
              {isExpired && <span className="text-redFood">(Expired!)</span>}
            </h3>
            <p className="text-sm text-gray-600">
              Quantity for {food_quantity} person
            </p>
            <p
              className={`text-sm mt-1 truncate ${
                isExpired ? "text-red-500" : "text-gray-600"
              }`}
            >
              Expires on: {expireIn} at {expiration_time}
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

export default FoodsCard;
