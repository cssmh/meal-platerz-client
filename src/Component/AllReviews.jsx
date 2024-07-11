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
import { FaTrash } from "react-icons/fa";
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
    const getReview = e.target.review.value;
    e.preventDefault();
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      quote: getReview,
      role: "client",
      image: user?.photoURL,
    };
    if (getReview.length < 1) {
      return toast.error("Review cannot be empty.");
    }
    try {
      const res = await addReviewAsClient(reviewData);
      if (res?.insertedId) {
        setIsOpen(false);
        swal("Thank You!", "Review added", "success");
        refetch();
      }
    } catch (error) {
      console.error("Error adding REview:", error);
      swal("Oops!", "Complete at least one food handover first", "error");
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
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-5xl font-semibold text-center text-white">
          What Our Client Says
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="mb-2 text-white bg-green-500 rounded-lg p-1"
        >
          Add your Review
        </button>
        <div className="space-y-6">
          {isLoading
            ? [...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="animate-pulse flex flex-col md:flex-row items-center">
                    <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto md:mx-4 my-4"></div>
                    <div className="p-6 flex-1">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2 w-32 h-6 bg-gray-300 rounded"></h2>
                      <p className="text-gray-600 mb-4 italic w-56 h-4 bg-gray-300 rounded"></p>
                      <p className="text-gray-500 text-sm w-24 h-4 bg-gray-300 rounded"></p>
                    </div>
                  </div>
                </div>
              ))
            : data?.map((client) => (
                <div
                  key={client?._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <img
                      src={client?.image}
                      alt={client?.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto md:mx-4 my-4"
                    />
                    <div className="p-6 flex-1">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {client?.name}
                      </h2>
                      <p className="text-gray-600 mb-4 italic">
                        {`"${client?.quote}"`}
                      </p>
                      <p className="text-gray-500 text-sm">{client?.role}</p>
                    </div>
                    {client?.email === user?.email && (
                      <button
                        onClick={() => handleDelete(client?._id, client?.email)}
                        className="px-3"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
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
