import axios from "axios";
import { Helmet } from "react-helmet-async";
import swal from "sweetalert";

const MyPendingCard = ({ getReq }) => {
  const {
    _id,
    food_id,
    user_image,
    user_name,
    user_email,
    user_phone,
    request_date,
    expired_date,
    expired_time,
    message_to_donator,
    donation_money,
    status,
  } = getReq;

  const handleUpdateStatus = (e, idx, foodIdx) => {
    const newStatus = e.target.value;
    const updatedStatus = { newStatus };

    if (newStatus === "Pending") {
      const foodStatus = "available";
      axios
        .put(`http://localhost:5000/food-status/${foodIdx}`, { foodStatus })
        .then((res) => console.log(res.data))
        .catch((res) => console.log(res));
    } else if (newStatus === "Delivered") {
      const foodStatus = "Unavailable";
      axios
        .put(`http://localhost:5000/food-status/${foodIdx}`, { foodStatus })
        .then((res) => console.log(res.data))
        .catch((res) => console.log(res));
    }

    axios
      .put(`http://localhost:5000/requested-status/${idx}`, updatedStatus)
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          swal("Thank You!", `Updated to ${newStatus}`, "success");
        }
      })
      .then();
  };

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | Food Request</title>
      </Helmet>
      <div className="text-center border border-redFood py-4 rounded-md space-y-1 mx-1 md:mx-0">
        <img src={user_image} className="w-36 mx-auto" alt="no image" />
        <h1 className="text-blue-800 text-lg">Requester Information</h1>
        <p>{user_name}</p>
        <div className="flex justify-center gap-1">
          <p className="text-cyan-600">Email: {user_email}</p>
          <p className="text-red-600">Phone: {user_phone}</p>
        </div>
        <p className="text-blue-600">Request Date & Time: {request_date}</p>
        <p>{message_to_donator}</p>
        <p>
          Expire Date & Time: {expired_date} {expired_time}
        </p>
        <p>Donation: {donation_money} BDT</p>
        <div className="text-center mt-1">
          <select
            defaultValue={status}
            onChange={(e) => handleUpdateStatus(e, _id, food_id)}
            className="input input-bordered"
            style={{ outline: "none" }}
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
