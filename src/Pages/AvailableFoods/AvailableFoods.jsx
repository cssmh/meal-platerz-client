import axios from "axios";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import FeaturedFoodsCard from "../FeaturedFoodsCard/FeaturedFoodsCard";

const AvailableFoods = () => {
  let searchTerm;
  const [allFoods, setAllFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalFoodsCount, setTotalFoodsCount] = useState(0);
  const [totalFoodsForSearch, setTotalFoodsForSearch] = useState([]);
  const foodsPerPageCount = Math.ceil(totalFoodsCount / limit);

  // for search book
  useEffect(() => {
    axios.get("http://localhost:5000/allFoods").then((res) => {
      setTotalFoodsForSearch(res.data?.result);
      setTotalFoodsCount(res.data?.totalFoods);
      setIsLoading(false);
    });
  }, []);
  // for search book end

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allFoods?page=${page}&limit=${limit}`)
      .then((res) => {
        setAllFoods(res.data?.result);
        setIsLoading(false);
      });
  }, [page, limit]);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < foodsPerPageCount) setPage(page + 1);
  };

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Available Foods</title>
      </Helmet>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <SyncLoader color="#FF0000" size={10} speedMultiplier={0.6} />
        </div>
      ) : (
        <div className="text-center mt-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Search for Food Name"
            className="text-sm border p-[10px]  rounded-xl focus:border-redFood min-w-[75%] md:min-w-[340px] border-red-500"
            style={{ outline: "none" }}
            onChange={(e) => {
              searchTerm = e.target.value;
              if (searchTerm === "") {
                setAllFoods(totalFoodsForSearch);
              } else {
                const searchItem = allFoods.filter((foods) =>
                  foods.food_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                );
                setAllFoods(searchItem);
              }
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto mt-2">
            {allFoods?.map((foods) => (
              <FeaturedFoodsCard key={foods._id} getFoods={foods} />
            ))}
          </div>
          {allFoods.length > 0 && (
            <div className="flex justify-center">
              <div className="flex flex-col md:flex-row justify-center mt-8">
                <div className="join">
                  <button
                    onClick={handlePrevious}
                    className="join-item btn btn-active hover:border-red-400 hover:bg-yellow-50 border-red-400 bg-yellow-50 hover:text-red-40 text-red-400"
                  >
                    Previous
                  </button>
                  {/* flex md:flex-wrap justify-center md:justify-start 
                    to avoid space */}
                  <div className="flex flex-wrap m-0 justify-center md:justify-start">
                    {Array(foodsPerPageCount)
                      .fill(0)
                      .map((getPage, idx) => {
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
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
