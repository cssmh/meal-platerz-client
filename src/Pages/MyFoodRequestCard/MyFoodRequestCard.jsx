import { useQuery } from "@tanstack/react-query";
import { getFood } from "../../api/Foods";
import SmallLoader from "../../Component/SmallLoader";

const MyRequestedFoodsCard = ({ getFoods, handleRequestedDelete }) => {
  const {
    _id,
    food_id,
    food_name,
    food_image,
    donator_email,
    donator_name,
    donator_phone,
    request_date,
    pickup_location,
    expired_date,
    expired_time,
    donation_money,
    status,
    delivered_at,
  } = getFoods;

  const { data = "", isLoading } = useQuery({
    queryKey: ["getFoodData", food_id],
    queryFn: async () => {
      const res = await getFood(food_id);
      return res.food_status;
    },
  });

  if (isLoading) return <SmallLoader />;

  return (
    <div className="border border-redFood rounded-md mx-1 lg:mx-0 py-5">
      <div className="flex flex-col md:flex-row px-2 md:px-[70px] items-center gap-3">
        <img src={food_image} className="w-3/5 md:w-32 rounded-lg" alt="food" />
        <div>
          <p className="text-2xl">{food_name}</p>
          <p className="text-lg text-blue-900">Donar Information</p>
          <h1 className="text-cyan-600">{donator_name}</h1>
          <p>{donator_email}</p>
          <p>{donator_phone}</p>
        </div>
      </div>
      <div className="px-3 md:px-[70px] mt-2">
        <p className="text-cyan-600">Pickup Location: {pickup_location}</p>
        <p>
          Expire In: {expired_date} {expired_time}
        </p>
        <p className="text-blue-600">Your Request: {request_date}</p>
        {donation_money > 0 && (
          <p>Thanks for your {donation_money} BDT donation</p>
        )}
        <div className="flex gap-2">
          {data === "available" ? (
            <p>
              Status:{" "}
              <span className={status === "Pending" && "text-redFood"}>
                {status}
              </span>
            </p>
          ) : data === "Unavailable" && delivered_at ? (
            <p>
              Delivered: <span className="text-cyan-500">{delivered_at}</span>{" "}
            </p>
          ) : (
            <p className="text-redFood">
              Sorry, This food is already delivered to someone else!
            </p>
          )}
        </div>
        {status !== "Delivered" && (
          <button
            onClick={() => handleRequestedDelete(_id, food_name)}
            className="mt-1 btn btn-sm border-black bg-base-100 hover:bg-black text-black hover:text-white"
          >
            Cancel Request
          </button>
        )}
      </div>
    </div>
  );
};

export default MyRequestedFoodsCard;
