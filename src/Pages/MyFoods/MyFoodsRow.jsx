import { Link } from "react-router-dom";
import UpdateMyFood from "./UpdateMyFood";

const MyFoodsRow = ({ getFood, handleDelete }) => {
  const {
    _id,
    food_image,
    food_name,
    expired_date,
    expired_time,
    food_status,
  } = getFood;
  
  return (
    <tr>
      <th>
        <div className="flex gap-5 items-center">
          <button
            onClick={() => handleDelete(_id, food_name)}
            className="btn btn-sm btn-circle btn-outline"
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
            <div className="mask w-16">
              <img src={food_image} alt="no image" />
            </div>
          </div>
        </div>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <Link to={`/food/${_id}`}>
              <p className="font-bold">{food_name}</p>
            </Link>
          </div>
        </div>
      </td>
      <td>
        <span>{expired_date}</span>
      </td>
      <td>{expired_time}</td>
      <td>{food_status}</td>
      <th>
        <UpdateMyFood foodInfo={getFood}></UpdateMyFood>
      </th>
      <td>
        <Link to={`/manage/${_id}`}>
          <button className="bg-redFood px-[10px] py-[7px] text-white rounded-lg">
            Request
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default MyFoodsRow;
