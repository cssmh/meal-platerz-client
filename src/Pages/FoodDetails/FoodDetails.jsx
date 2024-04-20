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
      <div className="flex flex-col lg:flex-row justify-center my-10 gap-7">
        <div>
          <img src={foodImage} className="w-[370px]" alt="" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold">{foodName}</h1>
          <p>Quantity: {foodQuantity} (no. of person to be served)</p>
          <p>{additionalNotes}</p>
          <p>{expiredDateTime}</p>
          <p>{pickupLocation}</p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mb-10">
        <button className="bg-redFood px-3 py-2 text-white rounded-md mb-2">
          Description
        </button>
        <p>{additionalNotes}</p>
      </div>
    </div>
  );
};

export default FoodDetails;
