import axios from "axios";
import swal from "sweetalert";
import { SyncLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import MyFoodRequestCard from "../MyFoodRequestCard/MyFoodRequestCard";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { deleteMyRequest, getMyRequests } from "../../api/Foods";
import SmallLoader from "../../Component/SmallLoader";

const MyFoodRequest = () => {
  const { loading, user } = useAuth();
  const {
    data: myFoodRequest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myFoodRequest", user?.email],
    queryFn: async () => {
      return await getMyRequests(user?.email);
    },
    enabled: !loading && !!user?.email,
  });

  const handleRequestedDelete = (idx, food_name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMyRequest(user?.email, idx).then((data) => {
          if (data?.deletedCount > 0) {
            refetch();
            swal(`Request on ${food_name} Canceled!`, {
              icon: "success",
            });
          }
        });
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
          <SmallLoader />
        ) : myFoodRequest.length === 0 ? (
          <p className="text-center my-3 text-redFood text-xl italic">
            You have&apos;nt requested for any food
          </p>
        ) : (
          <div className="mb-8">
            <p className="text-center my-3 text-blue-900 text-xl italic">
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
