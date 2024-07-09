import swal from "sweetalert";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  addTime,
  updateFoodStatus,
  updateRequestedStatus,
} from "../../api/Foods";
import useMyFoods from "../../hooks/useMyFoods";
import moment from "moment";

const MyPendingCard = ({ getReq, unavailableIds, refetchReq }) => {
  const {
    _id,
    food_id,
    user_image,
    user_name,
    user_email,
    user_phone,
    request_date,
    expiration_date,
    expiration_time,
    message_to_donator,
    donation_money,
    status,
    delivered_at,
  } = getReq;

  const [foodStatus, setFoodStatus] = useState(status);
  const [todayDateTime, setTodayDateTime] = useState("");
  const [delivered, setDelivered] = useState(delivered_at);
  const { refetch } = useMyFoods();

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD hh:mm A");
    setTodayDateTime(today);
  }, []);

  const handleUpdateStatus = async (e, idx, foodIdx) => {
    const newStatus = e.target.value;

    try {
      if (newStatus === "Pending") {
        const foodStatus = "available";
        await updateFoodStatus(foodIdx, foodStatus);
      } else if (newStatus === "Delivered") {
        const foodStatus = "Unavailable";
        await updateFoodStatus(foodIdx, foodStatus);
        addTime(idx, todayDateTime);
        setDelivered(todayDateTime);
      }

      const updatedStatus = { newStatus };
      await updateRequestedStatus(idx, updatedStatus);
      setFoodStatus(newStatus);
      refetch();
      refetchReq();
      swal("Thank You!", `Updated to ${newStatus}`, "success");
    } catch (error) {
      console.error("Error updating status:", error);
      swal("Error", "Failed to update status", "error");
    }
  };

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Food Request</title>
      </Helmet>
      <div className="border border-red-500 rounded-md space-y-1 mx-1 md:mx-0 h-96 flex flex-col justify-center items-center">
        <img
          src={user_image}
          className="w-20 h-20 rounded-full mx-auto"
          alt="User Avatar"
        />
        <h1 className="text-blue-800 text-xl font-semibold">
          Requester Information
        </h1>
        <p>{user_name}</p>
        <div className="flex">
          <span className="text-cyan-600">{user_email}</span>
          <span className="text-red-600">{user_phone}</span>
        </div>
        {message_to_donator && <p>a{message_to_donator}</p>}
        <p>
          Requested: <span className="">{request_date}</span>
        </p>
        {foodStatus === "Delivered" ? (
          <p>
            ✔️ Delivered: <span className="text-cyan-500">{delivered}</span>
          </p>
        ) : (
          <p>
            Expires in:{" "}
            <span className="text-blue-600 ">
              {expiration_date} at {expiration_time}
            </span>
          </p>
        )}
        <p>Donation: {donation_money} BDT</p>
        <div className="text-center mt-4">
          <select
            defaultValue={foodStatus}
            onChange={(e) => handleUpdateStatus(e, _id, food_id)}
            className="input input-bordered py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            disabled={
              foodStatus === "Delivered" || unavailableIds?.includes(food_id)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyPendingCard;
