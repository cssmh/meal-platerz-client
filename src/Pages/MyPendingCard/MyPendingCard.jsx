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

const MyPendingCard = ({ getReq, unavailableIds, refetchReq, idFetch }) => {
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
    delivered_date,
  } = getReq;

  const [todayDateTime, setTodayDateTime] = useState("");
  const { refetch } = useMyFoods();

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD hh:mm A");
    setTodayDateTime(today);
  }, []);

  const handleUpdateStatus = async (e, idx, foodId) => {
    const newStatus = e.target.value;

    try {
      if (newStatus === "Pending") {
        await updateFoodStatus(foodId, "available");
        refetch();
      } else if (newStatus === "Delivered") {
        await updateFoodStatus(foodId, "Unavailable");
        await addTime(idx, todayDateTime);
        refetchReq();
        idFetch();
        refetch();
      }

      await updateRequestedStatus(idx, { newStatus });
      refetchReq();
      swal("Thank You!", `Updated to ${newStatus}`, "success");
    } catch (error) {
      console.error("Error updating status:", error);
      swal("Error", "Failed to update status", "error");
    }
  };

  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");
  const reqDate = moment(request_date, "YYYY-MM-DD hh:mm A").format(
    "DD MMM YYYY [at] hh:mm A"
  );
  const deliverDate =
    delivered_date &&
    moment(delivered_date, "YYYY-MM-DD hh:mm A").format(
      "DD MMM YYYY [at] hh:mm A"
    );

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
        <h1 className="text-blue-800 text-xl">Requester Information</h1>
        <p>{user_name}</p>
        <div className="flex">
          <span className="text-cyan-600">{user_email}</span>
          <span className="text-red-600">{user_phone}</span>
        </div>
        {message_to_donator && <p>message: {message_to_donator}</p>}
        <p>
          Requested: <span className="">{reqDate}</span>
        </p>
        {status === "Delivered" ? (
          <p>
            ✔️ Delivered: <span className="text-cyan-500">{deliverDate}</span>
          </p>
        ) : (
          <p>
            Expires in:{" "}
            <span className="text-blue-600 ">
              {expireIn} at {expiration_time}
            </span>
          </p>
        )}
        <p>Donation: {donation_money} BDT</p>
        <div className="text-center mt-4">
          <select
            defaultValue={status}
            onChange={(e) => handleUpdateStatus(e, _id, food_id)}
            className="input input-bordered py-2 px-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            disabled={
              status === "Delivered" || unavailableIds?.includes(food_id)
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
