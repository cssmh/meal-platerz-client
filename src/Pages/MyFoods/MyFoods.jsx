import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import MyFoodsRow from "../MyFoodsRow/MyFoodsRow";
import { deleteMyFood } from "../../api/Foods";
import { SyncLoader } from "react-spinners";
import useMyFoods from "../../hooks/useMyFoods";
import useAuth from "../../hooks/useAuth";
import SmallLoader from "../../Component/SmallLoader";

const MyFoods = () => {
  const { user } = useAuth();
  const { isLoading, myFoods, refetch } = useMyFoods();

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
        <SmallLoader />
      ) : (
        <div className="overflow-x-auto my-3">
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
