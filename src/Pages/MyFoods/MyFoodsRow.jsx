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
            <p className="font-bold">{food_name}</p>
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
    </tr>
  );
};

export default MyFoodsRow;
