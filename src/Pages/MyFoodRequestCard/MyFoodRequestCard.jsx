import toast from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addReviews, getFood } from "../../api/Foods";
import useFood from "../../hooks/useFood";
import { Link } from "react-router-dom";
import ReviewModal from "../Modal/ReviewModal";
import SkeletonCard from "../SkeletonCard";

const MyRequestedFoodsCard = ({ getFoods, handleRequestedDelete }) => {
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
    expired_date,
    expired_time,
    user_email,
    donation_money,
    status,
    delivered_at,
  } = getFoods;

  const { isLoading: loading, food, refetch } = useFood(food_id);
  const [isOpen, setIsOpen] = useState(false);

  const { data = "", isLoading } = useQuery({
    queryKey: ["getFoodData", food_id],
    queryFn: async () => {
      const res = await getFood(food_id);
      return res?.food_status;
    },
  });

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

  if (isLoading || loading) return <SkeletonCard />;

  return (
    <div className="border border-redFood rounded-md mx-1 lg:mx-0 py-5">
      <div className="flex flex-col md:flex-row px-2 md:px-[70px] items-center gap-3">
        <img src={food_image} className="w-3/5 md:w-32 rounded-lg" alt="food" />
        <div>
          <Link to={`/food/${food_id}`}>
            <p className="text-2xl">{food_name}</p>
          </Link>
          <p className="text-lg text-blue-900">Donator Information</p>
          <h1 className="text-cyan-600">{donator_name}</h1>
          <p>{donator_email}</p>
          <p>{donator_phone}</p>
        </div>
      </div>
      <div className="px-3 md:px-[70px] mt-2">
        <p className="text-cyan-600">Pickup Location: {pickup_location}</p>
        <p>
          Expire In: {expired_date} {expired_time}
        </p>
        <p className="text-blue-600">Your Request: {request_date}</p>
        {donation_money > 0 && (
          <p>Thanks for your {donation_money} BDT donation</p>
        )}
        <div className="flex gap-2">
          {data === "available" ? (
            <p>
              Status:{" "}
              <span className={status === "Pending" && "text-redFood"}>
                {status}
              </span>
            </p>
          ) : data === "Unavailable" && delivered_at ? (
            <p>
              Delivered: <span>{delivered_at}</span>{" "}
            </p>
          ) : (
            <p className="text-redFood">
              Sorry, This food is already delivered to someone else!
            </p>
          )}
        </div>
        {status === "Delivered" ? (
          food.user_review ? (
            <p>
              <span className="text-green-600">Your review -</span>{" "}
              {food?.user_review}
              <button
                className="ml-2 text-blue-500 hover:underline"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit
              </button>
            </p>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-sm border bg-redFood hover:bg-redFood text-white mt-1"
            >
              Add Review
            </button>
          )
        ) : (
          <button
            onClick={() => handleRequestedDelete(_id, food_name)}
            className="mt-1 btn btn-sm border-black bg-base-100 hover:bg-black text-black hover:text-white"
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

export default MyRequestedFoodsCard;
