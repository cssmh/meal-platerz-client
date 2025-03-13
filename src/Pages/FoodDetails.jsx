import moment from "moment";
import { useParams } from "react-router-dom";
import MenuDetails from "./MenuDetails";
import { useEffect, useState } from "react";
import AddRequest from "./AddRequest";
import {
  FaInfoCircle,
  FaStar,
  FaClock,
  FaUser,
} from "react-icons/fa";
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
    <div className="bg-gray-50">
      <PlaterHelmet title={food_name} />
      <MenuDetails />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="font-semibold text-xl md:text-2xl text-blue-800 mb-3 flex items-center gap-2">
          <FaUser /> Donator Information
        </h1>
        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-medium">Name:</span> {donator_name}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {donator_phone}
          </p>
          <p>
            <span className="font-medium">Pickup Location:</span>{" "}
            {pickup_location}
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <img
            src={food_image}
            className="w-full lg:w-1/2 h-48 md:h-64 rounded-md object-cover shadow-lg"
            alt={food_name}
          />
          <div className="space-y-3">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
              {food_name}
            </h1>
            <p className="text-gray-600">
              <span className="font-medium">Quantity:</span> {food_quantity}{" "}
              (no. of persons to be served)
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <FaClock /> <span className="font-medium">Expires:</span>{" "}
              {expireIn} at {expiration_time}
            </p>
            {food_status === "Unavailable" ? (
              isUserDonator ? (
                <p className="text-[#f01543]">
                  You shared this food item.
                </p>
              ) : (
                <p className="text-[#f01543]">
                  This food item has been delivered!
                </p>
              )
            ) : isExpired ? (
              <p className="text-pink-700">
                This food item has expired!
              </p>
            ) : isAvailable ? (
              isUserDonator ? (
                <p className="text-blue-600">
                  You have listed this food item.
                </p>
              ) : (
                <AddRequest getFood={data} />
              )
            ) : null}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShow(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              show ? "bg-[#f01543] text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            <FaInfoCircle /> Description
          </button>
          {user_review && (
            <button
              onClick={() => setShow(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                !show ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              <FaStar /> Review
            </button>
          )}
        </div>
        {show ? (
          <p className="text-gray-700">{additional_notes}</p>
        ) : (
          <p className="text-gray-700">{user_review}</p>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
