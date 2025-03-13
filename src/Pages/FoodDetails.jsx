import moment from "moment";
import { useParams } from "react-router-dom";
import MenuDetails from "./MenuDetails";
import { useEffect, useState } from "react";
import AddRequest from "./AddRequest";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import SmallLoader from "../Component/SmallLoader";
import useIsExpire from "../hooks/useIsExpire";
import PlaterHelmet from "../Component/PlaterHelmet";
import { getFood } from "../api/Foods";

const FoodDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const { data = [], isLoading } = useQuery({
    queryKey: ["foodData", id],
    queryFn: () => getFood(id),
  });

  const {
    food_image,
    food_name,
    donator_name,
    donator_email,
    donator_phone,
    food_quantity,
    pickup_location,
    expiration_date,
    expiration_time,
    additional_notes,
    food_status,
    user_review,
  } = data;

  const [show, setShow] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      setShow(user_review ? false : true);
    }
  }, [isLoading, user_review]);

  const isExpired = useIsExpire(expiration_date, expiration_time);
  const expireIn = moment(expiration_date, "YYYY-MM-DD").format("DD MMM YYYY");
  const isAvailable = food_status === "available";
  const isUserDonator = user?.email === donator_email;

  if (isLoading) return <SmallLoader />;

  return (
    <div>
      <PlaterHelmet title={food_name} />
      <MenuDetails />
      <div className="text-center mx-auto max-w-md border-2 py-2 my-5 lg:mx-auto">
        <h1 className="font-semibold text-xl md:text-[22px] text-blue-800 mb-1">
          Donator Information
        </h1>
        <p className="text-cyan-600">Name: {donator_name}</p>
        <p>{donator_phone}</p>
        <p className="text-blue-600">Pickup Location: {pickup_location}</p>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center justify-center my-6 lg:my-8 gap-4 lg:gap-7">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-7">
          <img
            src={food_image}
            className="w-full h-48 md:w-[380px] md:h-[240px] rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
            alt="food"
          />
          <div className="space-y-1 mx-6 lg:mx-0 text-center lg:text-left">
            <h1 className="text-xl lg:text-2xl font-semibold">{food_name}</h1>
            <p className="text-gray-700">
              Quantity: {food_quantity} (no. of persons to be served)
            </p>
            <p className="text-gray-500">
              Expire In: {expireIn} at {expiration_time}
            </p>
            {food_status === "Unavailable" ? (
              isUserDonator ? (
                <p className="text-[#f01543]">You shared this food item.</p>
              ) : (
                <p className="text-[#f01543]">
                  This food item has been delivered!
                </p>
              )
            ) : isExpired ? (
              <p className="text-pink-700">This food item has expired!</p>
            ) : isAvailable ? (
              isUserDonator ? (
                <p className="text-blue-600 font-semibold">
                  You have listed this food item.
                </p>
              ) : (
                <AddRequest getFood={data} />
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] 2xl:max-w-[92%] mx-4 lg:mx-auto mb-7">
        <div className="flex gap-1">
          <button
            onClick={() => setShow(true)}
            className="bg-[#f01543] px-3 py-2 text-white rounded-md mb-2"
          >
            Description
          </button>
          {user_review && (
            <button
              onClick={() => setShow(false)}
              className="bg-blue-500 px-3 py-2 text-white rounded-md mb-2"
            >
              Review
            </button>
          )}
        </div>
        {show && <p className="text-gray-600">{additional_notes}</p>}
        {!show && <p className="text-gray-600">{user_review}</p>}
      </div>
    </div>
  );
};

export default FoodDetails;
