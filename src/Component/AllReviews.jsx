import { useState } from "react";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import {
  addReviewAsClient,
  deleteReviewAsClient,
  getClientSays,
} from "../api/Foods";
import ReviewModal from "../Pages/Modal/ReviewModal";
import useAuth from "../hooks/useAuth";
import { FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const AllReviews = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      return await getClientSays("", true);
    },
  });

  const closeModal = () => setIsOpen(false);
  const handleAddReview = async (e) => {
    e.preventDefault();
    const getReview = e.target.review.value;

    if (getReview.length < 1) {
      return toast.error("Review cannot be empty.");
    }

    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      quote: getReview,
      role: "client",
      image: user?.photoURL,
    };

    try {
      const res = await addReviewAsClient(reviewData);
      if (res?.insertedId) {
        setIsOpen(false);
        swal("Thank You!", "Review added", "success");
        refetch();
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      swal("Oops!", errorMessage, "error", { timer: 2000 });
      setIsOpen(false);
    }
  };

  const handleDelete = (id, email) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, it can't be recovered!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const res = await deleteReviewAsClient(id, email);
          if (res?.deletedCount > 0) {
            refetch();
            toast.success("Review deleted successfully.");
          }
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-center">
          What Our Clients Say
        </h1>
        <div className="text-center my-2">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center text-white bg-green-500 rounded-3xl p-2"
          >
            <FaPlus className="mr-2" /> Add Your Review
          </button>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [...Array(3)].map((_, idx) => (
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
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={client?.image}
                      alt={client?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {client?.name}
                      </h2>
                      <p className="text-gray-500 text-sm">{client?.role}</p>
                    </div>
                    {client?.email === user?.email && (
                      <button
                        onClick={() => handleDelete(client?._id, client?.email)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 italic">{`"${client?.quote}"`}</p>
                </div>
              ))}
        </div>
      </div>
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleAddReview={handleAddReview}
        width={"xl"}
      />
    </div>
  );
};

export default AllReviews;
