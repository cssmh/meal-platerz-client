import swal from "sweetalert";
import MyRequestedCard from "./MyRequestedCard";
import { deleteMyRequest } from "../api/Foods";
import SmallLoader from "../Component/SmallLoader";
import useMyRequest from "../hooks/useMyRequest";
import PlaterHelmet from "../Component/PlaterHelmet";

const MyRequest = () => {
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
              timer: 2000,
            });
          }
        });
      }
    });
  };

  if (isLoading) return <SmallLoader />;

  return (
    <div>
      <PlaterHelmet title={"My Requests"} />
      <div>
        {myFoodRequest?.length === 0 ? (
          <p className="text-center my-3 text-[#f01543] text-xl 2xl:text-2xl italic">
            You have&apos;nt requested for any food
          </p>
        ) : (
          <div className="mb-8">
            <p className="text-center my-3 text-blue-900 text-xl 2xl:text-2xl italic">
              Your requested all foods Here
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-[1250px] 2xl:max-w-[85%] mx-auto">
              {myFoodRequest?.map((food) => (
                <MyRequestedCard
                  key={food._id}
                  getFoods={food}
                  handleRequestedDelete={handleRequestedDelete}
                ></MyRequestedCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequest;
