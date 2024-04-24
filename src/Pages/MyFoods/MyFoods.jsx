import axios from "axios";
import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";
import MyFoodsRow from "./MyFoodsRow";

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

  const handleDelete = (idx) => {
    console.log(idx);
  };
  
  return (
    <div>
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
