import { Link } from "react-router-dom";

const FeaturedFoodsCard = ({ getFoods }) => {
  const {
    additionalNotes,
    donatorImage,
    donatorName,
    expiredDateTime,
    foodImage,
    foodName,
    foodQuantity,
    pickupLocation,
  } = getFoods;
  return (
    <div>
      <div className="flex flex-col bg-white border shadow-sm rounded-xl">
        <img
          className="w-full h-auto rounded-t-xl"
          src={foodImage}
          alt="Image"
        />
        <div className="p-2 md:p-3 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">{foodName}e</h3>
            <p className="mt-1 text-gray-500 dark:text-neutral-400">
              {foodQuantity}
            </p>
            <Link className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-redFood text-white">
              View Details
            </Link>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <img src={donatorImage} className="w-12 rounded-full" alt="" />
              <p>{donatorName}</p>
            </div>
            <p>{expiredDateTime}</p>
            <p>{pickupLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFoodsCard;
