import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedFoods } from "../api/Foods";
import FoodsCard from "./FoodsCard";
import SkeletonCard from "../Component/SkeletonCard";
import { useEffect, useState } from "react";
import useResLimit from "../hooks/useResLimit";

const FeaturedFoods = () => {
  const isMobile = useResLimit("(max-width: 767px)");
  const [skeletonSize, setSkeletonSize] = useState(isMobile ? 1 : 4);

  useEffect(() => {
    setSkeletonSize(isMobile ? 1 : 4);
  }, [isMobile]);

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["FeaturedFoods"],
    queryFn: async () => {
      return await getFeaturedFoods();
    },
  });

  return (
    <div className="relative -top-12 lg:-top-[30px]">
      <h1 className="text-center font-semibold text-lg md:text-xl mb-7">
        Featured Foods Sorted by Quantity (Highest to Lowest)
      </h1>
      {error ? (
        <div className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600">
          An error occurred while fetching Featured Foods!
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 max-w-[1300px] mx-auto md:mx-2 lg:mx-auto">
          {[...Array(skeletonSize)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 max-w-[1300px] mx-auto">
            {data?.map((foods, idx) => (
              <FoodsCard
                key={foods._id}
                getFoods={foods}
                aosDuration={idx * 300}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/available-foods">
              <button className="text-white bg-redFood font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Show all available Foods
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedFoods;
