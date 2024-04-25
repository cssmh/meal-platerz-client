import axios from "axios";
import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";
import MyFoodsRow from "./MyFoodsRow";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";

const MyFoods = () => {
  const { user } = useContextHook();
  const [isLoading, setIsLoading] = useState(true);
  const [myFoods, setMyFoods] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/myFoods?email=${user?.email}`)
      .then((res) => {
        setMyFoods(res.data);
        setIsLoading(false);
      });
  }, [user?.email]);

  const handleUpdate = (idx) => {
    console.log(idx);
  };

  const handleDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
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
                handleUpdate={handleUpdate}
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
