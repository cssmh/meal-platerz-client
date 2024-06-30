import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import MyFoodsRow from "../MyFoodsRow/MyFoodsRow";
import useAxiosHook from "../../hooks/useAxiosHook";
import useAuth from "../../hooks/useAuth";

const MyFoods = () => {
  const { axiosSecure } = useAxiosHook();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [myFoods, setMyFoods] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/myFoods?email=${user?.email}`).then((res) => {
      setMyFoods(res.data);
      setIsLoading(false);
    });
  }, [user?.email, axiosSecure]);

  const handleDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/delete-food/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            const remaining = myFoods.filter((food) => food._id !== idx);
            setMyFoods(remaining);
            swal(`${name} Deleted!`, {
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
        <title>MealPlaterz | My Foods</title>
      </Helmet>
      <div className="overflow-x-auto my-10">
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
            {myFoods.map((food) => (
              <MyFoodsRow
                key={food._id}
                handleDelete={handleDelete}
                getFood={food}
              ></MyFoodsRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoods;
