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
      <div className="border rounded-md mx-1 lg:mx-0 py-2 border-gray-300 bg-gray-100 animate-pulse">
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
      className={`border rounded-md mx-1 lg:mx-0 py-2 ${
        isExpired ? "bg-gray-100 text-gray-500" : "bg-white text-black"
      } shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out flex flex-col`}
    >
      <div className="flex flex-col md:flex-row items-center gap-3 p-4 flex-grow">
        <img
          src={food_image}
          className="w-28 h-20 rounded-lg object-cover shadow-md"
          alt="food"
        />
        <div className="flex flex-col items-start">
          <Link
            to={`/food/${food_id}`}
            className="text-xl font-semibold text-blue-800 hover:underline"
          >
            {food_name}
          </Link>
          <div className="text-sm text-gray-500">
            <p>
              Donated by <span className="text-blue-700">{donator_name}</span>
            </p>
            <p className="text-gray-400">Phone: {donator_phone}</p>
          </div>
        </div>
      </div>
      <div className="px-4 flex-grow">
        <p className="text-gray-600">
          Pickup Location:{" "}
          <span className="text-blue-600">{pickup_location}</span>
        </p>
        {!delivered_date && (
          <p className="text-gray-700">
            Expiry Date: {expireIn} at {expiration_time}
          </p>
        )}
        <p className="text-gray-500">Requested: {reqDate}</p>
        {free_delivery && isPremium && (
          <p className="text-green-600 font-semibold">Free Delivery Included</p>
        )}
        <div className="flex gap-2 items-center">
          {data === "available" ? (
            <p>
              Status:{" "}
              <span
                className={
                  status === "Pending" ? "text-red-600" : "text-green-600"
                }
              >
                {status}
              </span>
            </p>
          ) : data === "Unavailable" && delivered_date ? (
            <p className="text-green-500 font-medium">
              Delivered on: <span>{deliverDate}</span>
            </p>
          ) : (
            <p className="text-red-600">
              This food has already been delivered!
            </p>
          )}
        </div>
      </div>
      <div className="p-4 mt-auto">
        {isExpired ? (
          <div>
            <p className="text-red-500 mt-2">This food has expired.</p>
            <button
              onClick={() => handleRequestedDelete(_id, food_name)}
              className="btn bg-gray-300 text-black border-black hover:bg-gray-400 mt-2"
            >
              Cancel Request
            </button>
          </div>
        ) : status === "Delivered" ? (
          food?.user_review ? (
            <p className="bg-blue-50 p-2 mt-1 rounded-md border border-gray-300">
              <span className="text-green-600 font-semibold">Your Review:</span>{" "}
              <span className="text-gray-700">{food?.user_review}</span>
              <br />
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => setIsOpen(true)}
              >
                Edit Review
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
            className="mt-1 btn btn-sm bg-base-100 hover:bg-black text-black hover:text-white"
          >
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
