import swal from "sweetalert";
import MyFoodsRow from "./MyFoodsRow";
import { deleteMyFood } from "../api/Foods";
import useMyFoods from "../hooks/useMyFoods";
import SmallLoader from "../Component/SmallLoader";
import PlaterHelmet from "../Component/PlaterHelmet";

const MyFoods = () => {
  const { isLoading, myFoods, refetch, user } = useMyFoods();

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
              timer: 2000,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <PlaterHelmet title={"Manage Foods"} />
      {isLoading ? (
        <SmallLoader />
      ) : myFoods.length === 0 ? (
        <p className="text-[#f01543] min-h-[76vh] flex justify-center items-center">
          No food added by you
        </p>
      ) : (
        <div className="overflow-x-auto my-3">
          <table className="table max-w-7xl 2xl:max-w-[92%] mx-auto">
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
