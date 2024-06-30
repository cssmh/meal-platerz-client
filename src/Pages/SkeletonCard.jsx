const SkeletonCard = () => {
  return (
    <div className="flex flex-col shadow-lg rounded-lg bg-white mb-7">
      <div className="flex-grow">
        <div className="w-full h-[200px] md:h-48 bg-gray-200 animate-pulse rounded-2xl p-3"></div>
        <div className="px-3 text-left flex-1">
          <div className="mb-2">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mb-1"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3 mb-1"></div>
          </div>
          <div className="inline-block bg-gray-200 animate-pulse h-8 w-24 rounded-md"></div>
        </div>
      </div>
      <div className="p-2 flex justify-between items-center bg-gray-100 gap-1 mt-2">
        <div className="flex items-center justify-center gap-1">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
