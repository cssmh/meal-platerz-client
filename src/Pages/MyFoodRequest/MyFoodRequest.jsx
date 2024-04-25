import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import MyFoodRequestCard from "../MyFoodRequestCard/MyFoodRequestCard";

const MyFoodRequest = () => {
  const { user } = useContextHook();
  const [isLoading, setIsLoading] = useState(true);
  const [myFoodRequest, setMyFoodRequest] = useState([]);

  const url = `http://localhost:5000/my-requested?email=${user?.email}`;
  useEffect(() => {
    axios.get(url)?.then((res) => {
      setMyFoodRequest(res?.data);
      setIsLoading(false);
    });
  }, [url]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <SyncLoader color="#FF0000" size={10} speedMultiplier={0.6} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto my-4">
          {myFoodRequest.map((food) => (
            <MyFoodRequestCard
              key={food._id}
              getFoods={food}
            ></MyFoodRequestCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;
