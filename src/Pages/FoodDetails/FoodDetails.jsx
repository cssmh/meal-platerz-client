import { useLoaderData } from "react-router-dom";
import BannerFood from "./BannerFood";
import { Helmet } from "react-helmet-async";
import AddRequest from "../AddRequest/AddRequest";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

const FoodDetails = () => {
  const { user } = useAuth();
  const loadFoodData = useLoaderData();
  const {
    food_image,
    food_name,
    donator_name,
    donator_email,
    food_quantity,
    pickup_location,
    expired_date,
    expired_time,
    additional_notes,
    food_status,
  } = loadFoodData;

  const isFoodExpired = (expiryDate, expiryTime) => {
    const foodExpiryDateTime = moment(
      `${expiryDate} ${expiryTime}`,
      "DD-MM-YYYY hh:mm A"
    );
    return moment().isAfter(foodExpiryDateTime);
  };

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | FoodDetails</title>
      </Helmet>
      <BannerFood />
      <div className="text-center mx-auto max-w-md border-2 py-2 my-5 lg:mx-auto">
        <h1 className="font-semibold text-xl md:text-[22px] text-blue-800 mb-1">
          Donator Information
        </h1>
        <p className="text-cyan-600">Name: {donator_name}</p>
        <p>Email: {donator_email}</p>
        <p className="pb-1 text-blue-600">Pickup Location: {pickup_location}</p>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row lg:items-center justify-center my-6 lg:my-8 gap-4 lg:gap-7">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-7">
          <img
            src={food_image}
            className="mx-auto lg:mx-0 md:ml-auto w-2/5 md:w-[280px] rounded-lg"
            alt="food"
          />
          <div className="space-y-1 lg:space-y-[6px] mx-6 lg:mx-0 text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl font-semibold">{food_name}</h1>
            <p>Quantity: {food_quantity} (no. of persons to be served)</p>
            <p>
              Expire In: {expired_date} {expired_time}
            </p>
            {isFoodExpired(expired_date, expired_time) ? (
              <p>This Food is expired!</p>
            ) : food_status === "available" ? (
              user.email !== donator_email && (
                <AddRequest getFood={loadFoodData} />
              )
            ) : (
              <p className="text-redFood">This Food is already Delivered!</p>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 lg:mx-auto mb-7">
        <div className="flex gap-1">
          <button className="bg-redFood px-3 py-2 text-white rounded-md mb-2">
            Description
          </button>
        </div>
        <p>{additional_notes}</p>
      </div>
    </div>
  );
};

export default FoodDetails;
