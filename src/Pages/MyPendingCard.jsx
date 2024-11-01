import swal from "sweetalert";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { addTime, updateFoodStatus, updateRequestedStatus } from "../api/Foods";
import useMyFoods from "../hooks/useMyFoods";
import moment from "moment";
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
    donation_money,
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

  // format
  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");
  const reqDate = moment(request_date, "YYYY-MM-DD hh:mm A").format(
    "DD MMM YYYY [at] hh:mm A"
  );
  const deliverDate =
    delivered_date &&
    moment(delivered_date, "YYYY-MM-DD hh:mm A").format(
      "DD MMM YYYY [at] hh:mm A"
    );

  if (isLoading || loading)
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

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Food Request</title>
      </Helmet>
      <div className="border border-red-500 rounded-md mx-1 md:mx-0 h-auto flex flex-col p-4">
        <div className="flex items-center space-x-4">
          <img
            src={user_image}
            className="w-16 h-16 rounded-full"
            alt="User Avatar"
          />
          <div>
            <h1 className="text-blue-800 text-lg">Requester Information</h1>
            <p className="text-gray-700">{user_name}</p>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-cyan-600">{user_email}</p>
          <p className="text-red-600">{user_phone}</p>
          {message_to_donator && (
            <p className="text-gray-600">Message: {message_to_donator}</p>
          )}
          <p className="text-gray-600">
            Requested: <span>{reqDate}</span>
          </p>
          {status === "Delivered" ? (
            <p className="text-gray-600">
              ✔️ Delivered: <span className="text-cyan-500">{deliverDate}</span>
            </p>
          ) : (
            <p className="text-gray-600">
              Expires in:{" "}
              <span className="text-blue-600">
                {expireIn} at {expiration_time}{" "}
                <span className="text-redFood">
                  {isExpired && "(Expired!)"}
                </span>
              </span>
            </p>
          )}
          <p className="text-gray-600">Donation: {donation_money} BDT</p>
        </div>
        <div className="text-center mt-2">
          <select
            defaultValue={status}
            onChange={(e) => handleUpdateStatus(e, _id, food_id)}
            className="input input-bordered py-1 px-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none"
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
