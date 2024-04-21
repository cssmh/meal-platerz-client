import axios from "axios";
import { useEffect, useState } from "react";
import AvailableFoodsCard from "../AvailableFoodsCard/AvailableFoodsCard";

const AvailableFoods = () => {
  let searchTerm;
  const [allFoods, setAllFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalFoodsCount, setTotalFoodsCount] = useState(0);
  const [totalFoodsForSearch, setTotalFoodsForSearch] = useState([]);
  const foodsPerPageCount = Math.ceil(totalFoodsCount / limit);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allFoods?page=${page}&limit=${limit}`)
      .then((res) => {
        setTotalFoodsCount(res.data?.totalFoods);
        setAllFoods(res.data?.result);
      });
  }, [page, limit]);

  // for search book
  useEffect(() => {
    axios
      .get("http://localhost:5000/allFoods")
      .then((res) => setTotalFoodsForSearch(res.data.result));
  }, []);
  // for search book end

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < foodsPerPageCount) setPage(page + 1);
  };

  return (
    <div>
      <div className="text-center my-6">
        <input
          type="text"
          name="name"
          placeholder="Search for Foods or Authors"
          className="input input-bordered rounded-2xl focus:border-redFood min-w-[75%] md:min-w-[320px] border-red-500"
          style={{ outline: "none" }}
          onChange={(e) => {
            searchTerm = e.target.value;
            // console.log(searchTerm);
            if (searchTerm === "") {
              setAllFoods(totalFoodsForSearch);
            } else {
              const searchItem = allFoods.filter((foods) =>
                foods.foodName.toLowerCase().includes(searchTerm.toLowerCase())
              );
              setAllFoods(searchItem);
            }
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mt-6">
          {allFoods.map((foods) => (
            <AvailableFoodsCard
              key={foods._id}
              getFoods={foods}
            ></AvailableFoodsCard>
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
    </div>
  );
};

export default AvailableFoods;
