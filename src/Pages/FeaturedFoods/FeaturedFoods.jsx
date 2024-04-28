import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedFoodsCard from "../FeaturedFoodsCard/FeaturedFoodsCard";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/allfoods").then((res) => {
      const sortedFoods = res.data?.result.sort(
        (a, b) => b.food_quantity - a.food_quantity
      );
      setFeaturedFoods(sortedFoods);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="my-9">
      <h1 className="text-center font-semibold text-2xl mb-8">
        Featured Foods (Highest Quantity to Lowest)
      </h1>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <SyncLoader color="#FF0000" size={10} speedMultiplier={0.6} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {featuredFoods.slice(0, 8).map((foods, idx) => (
              <FeaturedFoodsCard key={idx} getFoods={foods}></FeaturedFoodsCard>
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
