import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedFoodsCard from "../FeaturedFoodsCard/FeaturedFoodsCard";

const FeaturedFoods = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/allfoods").then((res) => {
      setFeaturedFoods(res.data?.result);
    });
  }, []);

  return (
    <div className="my-12">
      <h1 className="text-center font-semibold text-2xl mb-8">Featured foods</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {featuredFoods.slice(0, 8).map((foods, idx) => (
          <FeaturedFoodsCard key={idx} getFoods={foods}></FeaturedFoodsCard>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFoods;
