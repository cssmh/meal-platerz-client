import { useLoaderData } from "react-router-dom";
import SingleFoodCard from "./SingleFoodCard";

const ManageSingleFood = () => {
  const loadRequestedData = useLoaderData();
  
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
      {loadRequestedData.map((req) => (
        <SingleFoodCard key={req._id} getReq={req}></SingleFoodCard>
      ))}
    </div>
  );
};

export default ManageSingleFood;
