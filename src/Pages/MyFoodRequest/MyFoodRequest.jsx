import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import useContextHook from "../../useCustomHook/useContextHook";
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

  const handleRequestedDelete = (idx, food_name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axios.delete(`http://localhost:5000/my-request/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            const remaining = myFoodRequest.filter((food) => food._id !== idx);
            setMyFoodRequest(remaining);
            swal(`${food_name} Canceled!`, {
              icon: "success",
            });
          }
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | My Food Request</title>
      </Helmet>
      <div>
        {isLoading ? (
          <div className="flex justify-center my-5">
            <SyncLoader color="#FF0000" size={10} speedMultiplier={0.6} />
          </div>
        ) : myFoodRequest.length === 0 ? (
          <p className="text-center my-4 text-redFood text-xl italic">
            You have&apos;nt requested for any food
          </p>
        ) : (
          <div className="mb-8">
            <p className="text-center my-4 text-blue-900 text-xl italic">
              Your requested all foods Here
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {myFoodRequest.map((food) => (
                <MyFoodRequestCard
                  key={food._id}
                  getFoods={food}
                  handleRequestedDelete={handleRequestedDelete}
                ></MyFoodRequestCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequest;
