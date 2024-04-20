import { useLoaderData } from "react-router-dom";
import BannerFood from "./BannerFood";

const FoodDetails = () => {
  const loadData = useLoaderData();
  const {
    additionalNotes,
    donatorImage,
    donatorName,
    expiredDateTime,
    foodImage,
    foodName,
    foodQuantity,
    pickupLocation,
  } = loadData;

  return (
    <div>
      <BannerFood></BannerFood>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center my-6 lg:my-16 gap-4 lg:gap-7">
        <div className="flex-1">
          <img
            src={foodImage}
            className="mx-auto lg:mx-0 lg:ml-auto lg:w-[400px]"
            alt=""
          />
        </div>
        <div className="flex-1 space-y-1 lg:space-y-[6px] mx-6 lg:mx-0">
          <h1 className="text-xl lg:text-4xl font-semibold">{foodName}</h1>
          <p>Quantity: {foodQuantity} (no. of person to be served)</p>
          <p>Expire In: {expiredDateTime}</p>
          <p>{additionalNotes.slice(0, 30)}</p>
          <p>Pickup Location: {pickupLocation}</p>
          <p className="text-redFood">Donar: {donatorName}</p>
          <button className="bg-redFood text-white px-3 py-2 rounded-md">
            Request for this food
          </button>
        </div>
      </div>
      <div className="max-w-[1200px] lg:mx-auto mb-9 lg:mb-16 mx-6">
        <div className="flex gap-1">
          <button className="bg-redFood px-3 py-2 text-white rounded-md mb-2">
            Description
          </button>
          <button className="bg-gray-300 px-5 py-2 rounded-md mb-2">
            Reviews
          </button>
        </div>
        <p>{additionalNotes}</p>
      </div>
    </div>
  );
};

export default FoodDetails;
