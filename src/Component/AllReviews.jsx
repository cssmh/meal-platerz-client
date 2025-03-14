import { useState } from "react";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import {
  addReviewAsClient,
  deleteReviewAsClient,
  getClientSays,
} from "../api/Foods";
import ReviewModal from "./ReviewModal";
import useAuth from "../hooks/useAuth";
import { FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import PlaterHelmet from "./PlaterHelmet";

const AllReviews = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: () => getClientSays(true),
  });

  const closeModal = () => setIsOpen(false);
  const handleAddReview = async (e) => {
    e.preventDefault();

    const getReview = e.target.review.value;
    if (getReview.length < 4) {
      return toast.info("Write your thought");
    }

    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      quote: getReview,
      role: "member",
      image: user?.photoURL,
    };

    try {
      const res = await addReviewAsClient(reviewData);
      if (res?.insertedId) {
        setIsOpen(false);
        swal("Thank You!", "Review added", "success", { timer: 2000 });
        refetch();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      swal("Oops!", errorMessage, "error", { timer: 2000 });
      setIsOpen(false);
    }
  };

  const handleDelete = async (id, email) => {
    try {
      const res = await deleteReviewAsClient(id, email);
      if (res?.deletedCount > 0) {
        refetch();
        toast.success("Review deleted successfully.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-100 py-4 mb-3">
      <PlaterHelmet title={"User Reviews"} />
      <div className="max-w-[1250px] 2xl:max-w-[85%] mx-auto px-3">
        <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-medium text-center">
          What Our Clients Say
        </h1>
        <div className="text-center my-2">
          <p className="text-sm 2xl:text-base text-gray-600 mb-2">
            Your review will be featured on the home page slider!
          </p>
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => {
                if (!user?.email) {
                  toast.info("Please log in to access this feature.");
                } else {
                  setIsOpen(true);
                }
              }}
              className="flex items-center justify-center text-white bg-green-500 rounded-lg py-2 2xl:py-[10px] px-4 my-1 2xl:my-2"
            >
              <FaPlus className="mr-2" /> Add Your Review
            </button>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-lg p-6 animate-pulse"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            : data?.map((client) => (
                <div
                  key={client?._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={client?.image}
                      alt={client?.name}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-800">
                        {client?.name}
                      </h2>
                      <p className="text-gray-500 text-sm 2xl:text-base">
                        {client?.role}
                      </p>
                    </div>
                    {client?.email === user?.email && (
                      <button
                        onClick={() => handleDelete(client?._id, client?.email)}
                        className="text-red-500 hover:text-red-600 2xl:text-lg"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 italic 2xl:text-lg">{`"${client?.quote}"`}</p>
                </div>
              ))}
        </div>
      </div>
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleAddReview={handleAddReview}
      />
    </div>
  );
};

export default AllReviews;
