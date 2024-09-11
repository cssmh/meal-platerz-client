const SkeletonCard = () => {
  return (
    <div className="mx-2 md:mx-0 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden mt-1 mb-6">
      <div className="relative w-full h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-3 flex flex-col justify-between flex-grow">
        <div className="mb-4">
          <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mb-1"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-1"></div>
        </div>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full mr-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
      </div>
      <div className="p-3 bg-gray-100 border-t border-gray-200">
        <div className="block text-center bg-gray-200 animate-pulse h-10 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
