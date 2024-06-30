import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import MyFoodsRow from "../MyFoodsRow/MyFoodsRow";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { deleteMyFood, getMyFoods } from "../../api/Foods";
import { SyncLoader } from "react-spinners";

const MyFoods = () => {
  const { loading, user } = useAuth();
  const {
    data: myFoods = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myFoods", user?.email],
    queryFn: async () => {
      return await getMyFoods(user?.email);
    },
    enabled: !loading && !!user?.email,
  });

  const handleDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMyFood(user?.email, idx).then((data) => {
          if (data?.deletedCount > 0) {
            refetch();
            swal(`${name} Deleted!`, {
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
        <title>MealPlaterz | My Foods</title>
      </Helmet>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <SyncLoader color="#FF0000" size={10} speedMultiplier={0.6} />
        </div>
      ) : (
        <div className="overflow-x-auto my-5">
          <table className="table max-w-7xl mx-auto">
            <thead>
              <tr>
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Expired Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Update</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {myFoods?.map((food) => (
                <MyFoodsRow
                  key={food._id}
                  handleDelete={handleDelete}
                  getFood={food}
                  refetch={refetch}
                ></MyFoodsRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoods;
