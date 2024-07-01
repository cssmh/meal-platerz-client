import swal from "sweetalert";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  addTime,
  updateFoodStatus,
  updateRequestedStatus,
} from "../../api/Foods";
import useMyFoods from "../../hooks/useMyFoods";

const MyPendingCard = ({ getReq, unavailableIds, refetchReq }) => {
  const {
    _id,
    food_id,
    user_image,
    user_name,
    user_email,
    user_phone,
    request_date,
    expired_date,
    expired_time,
    message_to_donator,
    donation_money,
    status,
    delivered_at,
  } = getReq;

  const [foodStatus, setFoodStatus] = useState(status);
  const [todayDateTime, setTodayDateTime] = useState("");
  const [delivered, setDelivered] = useState(delivered_at);
  const { refetch } = useMyFoods();

  // Set today's date and time for delivered booking
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;
    const formattedTime = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dateTime = `${formattedDate}, ${formattedTime}`;
    setTodayDateTime(dateTime);
  }, []);
  // Set today's date and time for delivered booking end

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
      <div className="text-center border border-redFood py-4 rounded-md space-y-1 mx-1 md:mx-0">
        <img
          src={user_image}
          className="w-24 rounded-lg mx-auto"
          alt="no image"
        />
        <h1 className="text-blue-800 text-lg">Requester Information</h1>
        <p>{user_name}</p>
        <div className="flex justify-center gap-1">
          <p className="text-cyan-600">{user_email}</p>
          <p className="text-red-600">{user_phone}</p>
        </div>
        <p>Requested on: {request_date}</p>
        <p>{message_to_donator}</p>
        <p>
          Expire in:{" "}
          <span className="text-blue-600">
            {expired_date} {expired_time}
          </span>
        </p>
        {foodStatus === "Delivered" && (
          <p>
            Delivered: <span className="text-cyan-500">{delivered}</span>
          </p>
        )}
        <p>Donation: {donation_money} BDT</p>
        <div className="text-center mt-1">
          <select
            defaultValue={foodStatus}
            onChange={(e) => handleUpdateStatus(e, _id, food_id)}
            className="input input-bordered"
            style={{ outline: "none" }}
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
