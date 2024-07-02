import { Link } from "react-router-dom";
import { useState } from "react";
import UpdateMyFood from "../UpdateMyFood/UpdateMyFood";

const MyFoodsRow = ({ getFood, handleDelete, refetch }) => {
  const [foodData, setFoodData] = useState(getFood);
  const {
    _id,
    food_image,
    food_name,
    expired_date,
    expired_time,
    food_status,
    food_quantity,
    requestCount,
  } = foodData;

  return (
    <tr>
      <th>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleDelete(_id, food_name)}
            className={`${
              food_status === "Unavailable" && "pointer-events-none opacity-50"
            } btn btn-sm btn-circle btn-outline`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="avatar">
            <div className="mask w-16 rounded-tr-2xl rounded-bl-2xl">
              <img src={food_image} alt="no image" />
            </div>
          </div>
        </div>
      </th>
      <td>
        <Link to={`/food/${_id}`}>{food_name}</Link>
      </td>
      <td>
        <span className="pl-4 text-emerald-600">{food_quantity}</span>
      </td>
      <td>
        <span>{expired_date}</span>
      </td>
      <td>{expired_time}</td>
      <td
        className={
          food_status === "available" ? "text-emerald-600" : "text-redFood"
        }
      >
        {food_status}
      </td>
      <th>
        <UpdateMyFood
          foodData={foodData}
          setFoodData={setFoodData}
          food_status={food_status}
          refetch={refetch}
        ></UpdateMyFood>
      </th>
      <td>
        <Link to={`/manage/${_id}`}>
          <button
            className={`${
              food_status === "Unavailable" ? "bg-cyan-600" : "bg-redFood"
            } px-[10px] py-[7px] text-white rounded-lg`}
          >
            {food_status === "Unavailable"
              ? "Delivered"
              : `Request(${requestCount || 0})`}
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default MyFoodsRow;
