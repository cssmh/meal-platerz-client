import axios from "axios";
import swal from "sweetalert";

const SingleFoodCard = ({ getReq }) => {
  const {
    donation_money,
    donator_email,
    donator_name,
    expired_date,
    expired_time,
    food_id,
    food_image,
    food_name,
    message_to_donator,
    pickup_location,
    request_date,
    status,
    user_email,
    user_image,
    user_name,
    user_phone,
    _id,
  } = getReq;

  const handleUpdateStatus = (e, idx) => {
    const newStatus = e.target.value;
    const updatedStatus = { newStatus };
    axios
      .put(`http://localhost:5000/request-status/${idx}`, updatedStatus)
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          swal("Thank You!", `Updated to ${newStatus}`, "success");
        }
      })
      .then();
  };

  return (
    <div className="text-center border border-redFood py-4 rounded-md space-y-1 mx-1 md:mx-0">
      <img src={user_image} className="mx-auto" alt="no image" />
      <h1 className="text-blue-800 text-lg">Requester Information</h1>
      <p>{user_name}</p>
      <p>Email: {user_email}</p>
      <p>Expire Time & Date: {expired_date} {expired_time}</p>
      <p>Request Time & Date: {request_date}</p>
      <div className="text-center mt-1">
        <select
          defaultValue={status}
          onChange={(e) => handleUpdateStatus(e, _id)}
          className="input input-bordered"
          style={{ outline: "none" }}
        >
          <option value="Pending">
            <button className="btn btn-primary">Pending</button>
          </option>
          <option value="Delivered">
            <button className="btn btn-primary">Delivered</button>
          </option>
        </select>
      </div>
    </div>
  );
};

export default SingleFoodCard;
