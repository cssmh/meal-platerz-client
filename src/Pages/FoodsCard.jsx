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

  // Calculate remaining time// const expirationDateTime = moment(
  //   `${expiration_date} ${expiration_time}`,
  //   "YYYY-MM-DD hh:mm A"
  // );
  // const now = moment();
  // const timeLeft = expirationDateTime.diff(now);

  // let remainingTime = "Expired";
  // if (timeLeft > 0) {
  //   const duration = moment.duration(timeLeft);
  //   const totalDays = Math.floor(duration.asDays());
  //   const hours = duration.hours();
  //   const minutes = duration.minutes();

  //   remainingTime = `${totalDays > 0 ? `${totalDays} day(s)` : ""} ${
  //     hours > 0 ? `${hours} hour(s)` : ""
  //   } ${minutes > 0 ? `${minutes} minute(s)` : ""}`.trim();
  // }

  // Calculate remaining time

  const expirationDateTime = moment(
    `${expiration_date} ${expiration_time}`,
    "YYYY-MM-DD hh:mm A"
  );
  const now = moment();
  const timeLeft = expirationDateTime.diff(now);

  let remainingTime = "Expired";
  if (timeLeft > 0) {
    const duration = moment.duration(timeLeft);
    const totalDays = Math.floor(duration.asDays());
    const totalHours = Math.floor(duration.asHours());
    const totalMinutes = duration.minutes();
    const totalRemainingMinutes = duration.asMinutes();

    if (totalDays > 1) {
      remainingTime = `${totalDays} day(s)`;
    } else if (totalDays === 1 || totalHours >= 1) {
      const minutesAfterHours = Math.floor(totalRemainingMinutes % 60);
      remainingTime = `${totalHours} hour(s) ${minutesAfterHours} min(s)`;
    } else if (totalHours === 0 && totalMinutes > 0) {
      remainingTime = `${totalMinutes} minute(s)`;
    } else {
      remainingTime = "Less than a minute";
    }
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="700"
      className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative">
        <img
          alt={food_name}
          src={food_image}
          className="w-full h-60 md:h-48 2xl:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute top-2 right-2 text-xs 2xl:text-sm font-semibold py-1 px-2 rounded-md ${
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
      <div className="p-3 flex flex-col justify-between flex-grow">
        <h3 className="text-lg 2xl:text-xl font-semibold text-gray-900 leading-tight">
          {food_name}
        </h3>
        <p className="text-sm 2xl:text-base text-gray-600">
          Quantity: {food_quantity} person{food_quantity > 1 ? "s" : ""}
        </p>
        <p
          className={`text-sm 2xl:text-base mt-1 ${
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
        {!isExpired && food_status !== "Unavailable" && (
          <p className="text-sm 2xl:text-base text-blue-600 mt-1">
            Time Remaining: {remainingTime}
          </p>
        )}
        <div className="flex items-center mt-4">
          <img
            className="w-10 2xl:w-11 h-10 2xl:h-11 rounded-full object-cover mr-3 border-2 border-red-500"
            src={donator_image}
            alt={donator_name}
          />
          <div className="text-sm 2xl:text-base">
            <p className="text-gray-800 font-semibold">{donator_name}</p>
            <div className="flex items-center text-gray-500">
              <FaMapMarkerAlt className="mr-1 text-red-500" /> {pickup_location}
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 pb-3 pt-1">
        <Link
          to={`/food/${_id}`}
          className="block text-center 2xl:text-lg bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:scale-105 transition-all duration-300 shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodsCard;
