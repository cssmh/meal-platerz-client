import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import MyFoodRequestCard from "../MyFoodRequestCard/MyFoodRequestCard";
import { deleteMyRequest } from "../../api/Foods";
import SmallLoader from "../../Component/SmallLoader";
import useMyRequest from "../../hooks/UseMyRequest";

const MyFoodRequest = () => {
  const { isLoading, myFoodRequest, refetch, user } = useMyRequest();

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

  if (isLoading) return <SmallLoader />;

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | My Food Request</title>
      </Helmet>
      <div>
        {myFoodRequest?.length === 0 ? (
          <p className="text-center my-3 text-redFood text-xl italic">
            You have&apos;nt requested for any food
          </p>
        ) : (
          <div className="mb-8">
            <p className="text-center my-3 text-blue-900 text-xl italic">
              Your requested all foods Here
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {myFoodRequest?.map((food) => (
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
