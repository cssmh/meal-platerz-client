import axios from "axios";
import { useEffect, useState } from "react";
import AvailableFoodsCard from "../AvailableFoodsCard/AvailableFoodsCard";

const AvailableFoods = () => {
  let searchTerm;
  const [allFoods, setAllFoods] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalBooksForSearch, setTotalBooksForSearch] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allFoods?page=${page}&limit=${limit}`)
      .then((res) => {
        setAllFoods(res.data?.result);
      });
  }, [page, limit]);

  // for search book
  useEffect(() => {
    axios
      .get("http://localhost:5000/allFoods")
      .then((res) => setTotalBooksForSearch(res.data.result));
  }, []);
  // for search book end

  return (
    <div>
      <div className="text-center my-6">
        <input
          type="text"
          name="name"
          placeholder="Search for Books or Authors"
          className="input input-bordered rounded-2xl focus:border-redFood min-w-[75%] md:min-w-[320px] border-red-500"
          style={{ outline: "none" }}
          onChange={(e) => {
            searchTerm = e.target.value;
            // console.log(searchTerm);
            if (searchTerm === "") {
              setAllFoods(totalBooksForSearch);
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
      </div>
    </div>
  );
};

export default AvailableFoods;
