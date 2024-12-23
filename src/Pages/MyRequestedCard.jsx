import moment from "moment";
import { toast } from "sonner";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addReviews, getFood } from "../api/Foods";
import useFood from "../hooks/useFood";
import { Link } from "react-router-dom";
import ReviewModal from "../Component/ReviewModal";
import useIsExpire from "../hooks/useIsExpire";
import useIsPremium from "../hooks/useIsPremium";

const MyRequestedCard = ({ getFoods, handleRequestedDelete }) => {
  const isPremium = useIsPremium();
  const {
    _id,
    food_id,
    food_name,
    food_image,
    donator_email,
    donator_name,
    donator_phone,
    request_date,
    pickup_location,
    expiration_date,
    expiration_time,
    user_email,
    status,
    delivered_date,
    free_delivery,
  } = getFoods;

  const { isLoading: loading, food, refetch } = useFood(food_id);
  const [isOpen, setIsOpen] = useState(false);
  const isExpired = useIsExpire(food?.expiration_date, food?.expiration_time);

  const { data = "", isLoading } = useQuery({
    queryKey: ["getFoodData", food_id],
    queryFn: async () => {
      const res = await getFood(food_id);
      return res?.food_status;
    },
  });

  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");
  const reqDate = moment(request_date, "YYYY-MM-DD hh:mm A").format(
    "DD MMM YYYY [at] hh:mm A"
  );
  const deliverDate =
    delivered_date &&
    moment(delivered_date, "YYYY-MM-DD hh:mm A").format(
      "DD MMM YYYY [at] hh:mm A"
    );

  const closeModal = () => setIsOpen(false);
  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    try {
      const res = await addReviews(food_id, user_email, review);
      if (res?.modifiedCount > 0) {
        refetch();
        toast.success("Review added successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  if (isLoading || loading)
    return (
      <div className="border rounded-md mx-1 lg:mx-0 py-4 border-gray-300 bg-gray-100 animate-pulse">
        <div className="flex flex-col md:flex-row px-2 md:px-8 items-center gap-3">
          <div className="w-24 md:w-32 h-24 md:h-32 bg-gray-300 rounded-md" />
          <div className="flex flex-col items-start">
            <div className="h-6 w-1/2 bg-gray-300 rounded-md mb-2" />
            <div className="text-lg text-blue-900 h-4 w-3/4 bg-gray-300 rounded-md mb-1" />
            <h1 className="text-cyan-600 h-6 w-1/3 bg-gray-300 rounded-md mb-2" />
            <div className="flex flex-col md:flex-row gap-1">
              <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
              <div className="h-4 w-1/4 bg-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        <div className="space-y-1 px-3 md:px-8 mt-1">
          <div className="h-4 w-full bg-gray-300 rounded-md" />
          <div className="h-4 w-full bg-gray-300 rounded-md" />
          <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
          <div className="h-4 w-3/4 bg-gray-300 rounded-md" />
          <div className="flex gap-2">
            <div className="h-4 w-1/2 bg-gray-300 rounded-md" />
          </div>
          <div className="h-4 w-full bg-gray-300 rounded-md mt-2" />
          <div className="h-8 w-1/4 bg-gray-300 rounded-md mt-2" />
        </div>
      </div>
    );

  return (
    <div
      className={`border rounded-md mx-1 lg:mx-0 py-4 ${
        isExpired ? "bg-gray-100 text-gray-500" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row px-2 md:px-8 items-center gap-3">
        <img
          src={food_image}
          className="w-24 md:w-32 rounded-md object-cover"
          alt="food"
        />
        <div className="flex flex-col items-start">
          <Link
            to={`/food/${food_id}`}
            className="text-xl font-semibold text-blue-800"
          >
            {food_name}
          </Link>
          <p className="text-lg text-gray-600">Donator Information</p>
          <h1 className="text-blue-700 font-medium">{donator_name}</h1>
          <p className="text-sm text-gray-500">({donator_phone})</p>
        </div>
      </div>
      <div className="space-y-2 px-3 md:px-8 mt-2">
        <p className="text-gray-700">
          Pickup Location:{" "}
          <span className="text-blue-600">{pickup_location}</span>
        </p>
        {!delivered_date && (
          <p className="text-gray-700">
            Expire on: {expireIn} at {expiration_time}
          </p>
        )}
        <p className="text-gray-700">Your Request: {reqDate}</p>
        {free_delivery && isPremium ? (
          <p className="text-green-600 font-semibold">Free Delivery Included</p>
        ) : (
          <p className="text-red-600">
            Membership expired! Upgrade to premium for free delivery.
          </p>
        )}
        <div className="flex gap-2">
          {data === "available" ? (
            <p>
              Status:{" "}
              <span className={status === "Pending" ? "text-red-600" : ""}>
                {status}
              </span>
            </p>
          ) : data === "Unavailable" && delivered_date ? (
            <p className="text-blue-600">
              Delivered: <span>{deliverDate}</span>
            </p>
          ) : (
            <p className="text-red-600">
              Sorry, this food has already been delivered!
            </p>
          )}
        </div>
        {isExpired ? (
          <>
            <p className="text-red-500 mt-2">This food has expired.</p>
            <button
              onClick={() => handleRequestedDelete(_id, food_name)}
              className="mt-2 btn btn-sm bg-gray-300 text-black border-black"
            >
              Cancel Request
            </button>
          </>
        ) : status === "Delivered" ? (
          food?.user_review ? (
            <p className="bg-blue-50 p-2 rounded-md border border-gray-300">
              <span className="text-green-600 font-semibold">Your Review:</span>{" "}
              <span className="text-gray-700">{food?.user_review}</span>
              <button
                className="ml-4 text-sm text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200"
                onClick={() => setIsOpen(true)}
              >
                Edit
              </button>
            </p>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-sm bg-red-600 hover:bg-red-700 text-white mt-2"
            >
              Add Review
            </button>
          )
        ) : (
          <button
            onClick={() => handleRequestedDelete(_id, food_name)}
            className="mt-1 btn btn-sm border-black bg-base-100 hover:bg-black text-black hover:text-white">
            Cancel Request
          </button>
        )}
      </div>
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleAddReview={handleAddReview}
        review={food?.user_review}
      />
    </div>
  );
};

export default MyRequestedCard;
