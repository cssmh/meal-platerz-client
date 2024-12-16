import swal from "sweetalert";
import { useEffect, useState } from "react";
import moment from "moment";
import PlaterHelmet from "../Component/PlaterHelmet";
import { addTime, updateFoodStatus, updateRequestedStatus } from "../api/Foods";
import useMyFoods from "../hooks/useMyFoods";
import useFood from "../hooks/useFood";
import useIsExpire from "../hooks/useIsExpire";

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
    status,
    delivered_date,
  } = getReq;

  const [todayDateTime, setTodayDateTime] = useState("");
  const { isLoading, food } = useFood(food_id);
  const { isLoading: loading, refetch } = useMyFoods();
  const isExpired = useIsExpire(food?.expiration_date, expiration_time);

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
      swal("Thank You!", `Updated to ${newStatus}`, "success", { timer: 2000 });
    } catch (error) {
      console.error("Error updating status:", error);
      swal("Error", "Failed to update status", "error", { timer: 2000 });
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

  if (isLoading || loading) {
    return (
      <div className="border border-gray-300 rounded-md mx-1 md:mx-0 h-auto flex flex-col p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-36"></div>
          </div>
        </div>
        <div className="mt-2 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-40"></div>
          <div className="h-3 bg-gray-300 rounded w-32"></div>
          <div className="h-3 bg-gray-300 rounded w-56"></div>
          <div className="h-3 bg-gray-300 rounded w-28"></div>
          <div className="h-3 bg-gray-300 rounded w-44"></div>
        </div>
        <div className="text-center mt-2">
          <div className="h-8 bg-gray-300 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PlaterHelmet title="Food Request" />
      <div className="border border-gray-300 rounded-lg p-4 shadow-md mx-2 md:mx-0 space-y-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-4">
          <img
            src={user_image}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border border-gray-200 shadow-sm"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user_name}</h2>
            <p className="text-sm text-gray-500">{user_email}</p>
            <p className="text-sm text-gray-500">{user_phone}</p>
          </div>
        </div>
        <div className="space-y-2">
          {message_to_donator && (
            <p className="text-sm text-gray-600 italic">{message_to_donator}</p>
          )}
          <p className="text-sm text-gray-700">Requested: {reqDate}</p>
          {status === "Delivered" ? (
            <p className="text-sm text-green-600">
              ✔️ Delivered: {deliverDate}
            </p>
          ) : (
            <p className="text-sm text-gray-700">
              Expires in: {expireIn} at {expiration_time}{" "}
              {isExpired && <span className="text-red-500">(Expired!)</span>}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-medium py-1 px-2 rounded-full ${
              status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            Status: {status}
          </span>
          <select
            defaultValue={status}
            onChange={(e) => handleUpdateStatus(e, _id, food_id)}
            className="text-sm bg-white border border-gray-300 rounded-lg shadow-sm py-1 px-3 focus:outline-none hover:bg-gray-50 transition-colors"
            disabled={
              isExpired ||
              status === "Delivered" ||
              unavailableIds?.includes(food_id)
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
