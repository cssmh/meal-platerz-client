import { useQuery } from "@tanstack/react-query";
import { getClientSays } from "../api/Foods";
import SkeletonCard from "../Pages/SkeletonCard";
const Reviews = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      return await getClientSays();
    },
  });

  if (isLoading) return <SkeletonCard />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-semibold text-center text-white mb-10">
          What Our Users Says
        </h1>
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
                      <p className="text-gray-600 mb-4 italic">{`"${client?.quote}"`}</p>
                      <p className="text-gray-500 text-sm">{client?.role}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
