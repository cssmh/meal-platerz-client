import { Link } from "react-router-dom";

const AvailableFoodsCard = ({ getFoods }) => {
  const {
    _id,
    donatorImage,
    donatorName,
    expiredDateTime,
    foodImage,
    foodName,
    foodQuantity,
    pickupLocation,
  } = getFoods;
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          className="w-full h-48 mx-auto lg:mx-0 object-cover object-center"
          src={foodImage}
          alt="Food"
        />
        <div className="p-4 text-left">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{foodName}</h3>
            <p className="text-sm text-gray-600">
              Quantity for {foodQuantity} person
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Expire in {expiredDateTime}
            </p>
          </div>
          <Link
            to={`/food/${_id}`}
            className="inline-block bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            View Details
          </Link>
        </div>
        <div className="flex justify-around px-4 py-3 bg-gray-100 gap-1">
          <div className="flex-1">
            <div className="flex items-center justify-center">
              <img
                className="w-8 h-8 rounded-full mr-2 object-cover"
                src={donatorImage}
                alt="donator"
              />
              <p className="text-sm text-gray-800">{donatorName}</p>
            </div>
          </div>
          <p className="flex-1 text-xs text-gray-600">
            Location: <span className="text-redFood">{pickupLocation}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailableFoodsCard;
