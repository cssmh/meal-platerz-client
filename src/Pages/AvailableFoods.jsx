import { useEffect, useState } from "react";
import FoodsCard from "./FoodsCard";
import useResLimit from "../hooks/useResLimit";
import SkeletonCard from "../Component/SkeletonCard";
import { useQuery } from "@tanstack/react-query";
import { getAllFoods } from "../api/Foods";
import PlaterHelmet from "../Component/PlaterHelmet";

const AvailableFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const isMobile = useResLimit("(max-width: 767px)");
  const [limit, setLimit] = useState(isMobile ? 4 : 8);

  useEffect(() => {
    setLimit(isMobile ? 4 : 8);
    setPage(1);
  }, [isMobile]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["allFoods", page, limit, searchTerm],
    queryFn: async () => {
      return await getAllFoods(page, limit, searchTerm);
    },
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < data?.totalPages) setPage(page + 1);
  };

  return (
    <div>
      <PlaterHelmet title={"Available Foods"} />
      <div className="text-center mt-3 mb-2">
        <input
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search for Food Name and Location"
          className="text-sm border py-[9px] px-[11px] rounded-xl focus:border-redFood min-w-[75%] md:min-w-[340px] border-red-500"
          style={{ outline: "none" }}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-[1300px] 2xl:max-w-[92%] mx-auto md:mx-2 lg:mx-auto mt-4">
          {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {data?.result?.length === 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
              No Food found!
            </p>
          ) : (
            <>
              <h1 className="text-center font-semibold text-lg md:text-xl">
                Available Foods Sorted by Expiration Date
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-[1300px] 2xl:max-w-[92%] mx-auto mt-2">
                {data?.result?.map((food) => (
                  <FoodsCard
                    key={food._id}
                    getFoods={food}
                  />
                ))}
              </div>
            </>
          )}
          {data?.result?.length > 0 && (
            <div className="flex justify-center mb-4">
              <div className="flex flex-col md:flex-row justify-center mt-8">
                <div className="join">
                  <button
                    onClick={handlePrevious}
                    className="join-item btn btn-active hover:border-red-400 hover:bg-yellow-50 border-red-400 bg-yellow-50 hover:text-red-40 text-red-400"
                  >
                    Previous
                  </button>
                  <div className="flex flex-wrap m-0 justify-center md:justify-start">
                    {Array(data?.totalPages)
                      .fill(0)
                      .map((_, idx) => {
                        const pageNumber = idx + 1;
                        return (
                          <button
                            onClick={() => setPage(pageNumber)}
                            key={pageNumber}
                            className={
                              page === pageNumber
                                ? "btn border-red-400 hover:border-red-400 bg-red-400 text-white rounded-none mb-2"
                                : "btn border-red-400 hover:border-red-400 bg-yellow-50 hover:bg-red-400 text-red-400 hover:text-white rounded-none mb-2 md:mb-0"
                            }
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                  </div>
                  <button
                    onClick={handleNext}
                    className="join-item btn btn-active hover:border-red-400 hover:bg-yellow-50 border-red-400 bg-yellow-50 hover:text-red-40 text-red-400"
                  >
                    Next
                  </button>
                </div>
                <div className="ml-6 md:ml-0 text-center md:text-left mt-2 md:mt-0">
                  <select
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value));
                      setPage(1);
                    }}
                    defaultValue={limit}
                    className="input input-bordered border-red-400 text-red-500 outline-none focus:border-redFood"
                    style={{ outline: "none" }}
                  >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AvailableFoods;
