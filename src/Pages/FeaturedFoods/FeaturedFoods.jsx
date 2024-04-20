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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto my-12">
      {featuredFoods.map((foods, idx) => (
        <FeaturedFoodsCard key={idx} getFoods={foods}></FeaturedFoodsCard>
      ))}
    </div>
  );
};

export default FeaturedFoods;
