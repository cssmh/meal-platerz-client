import moment from "moment";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { addFood } from "../../api/Foods";
import { TbFidgetSpinner } from "react-icons/tb";

const AddFood = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [expiredDate, setExpiredDate] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
  }, []);

  const handleDateChange = (e) => {
    setExpiredDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setExpiredTime(e.target.value);
  };

  const formattedDate = moment(expiredDate).format("DD-MM-YYYY");
  const formattedTime = moment(expiredTime, "HH:mm").format("hh:mm A");

  const handleAddFood = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const food_quantity = parseInt(form.food_quantity.value);
    const donator_name = user?.displayName;
    const donator_image = user?.photoURL;
    const donator_email = user?.email;
    const donator_phone = form.phone.value;
    const expired_date = formattedDate;
    const expired_time = formattedTime;
    const pickup_location = form.pickup_location.value;
    const additional_notes = form.additional_notes.value;
    const food_status = "available";

    const foodInformation = {
      food_name,
      food_image,
      food_quantity,
      donator_name,
      donator_image,
      donator_email,
      donator_phone,
      expired_date,
      expired_time,
      pickup_location,
      food_status,
      additional_notes,
    };

    try {
      const res = await addFood(foodInformation);
      if (res?.insertedId) {
        swal("Thank You!", `${food_name} added`, "success");
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error adding food:", error);
      swal("Oops!", "Failed to add food. Please try again later.", "error");
    }
  };

  return (
    <div className="my-5">
      <Helmet>
        <title>MealPlaterz | Add Food</title>
      </Helmet>
      <form onSubmit={handleAddFood} className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              name="food_name"
              required
              className="input input-bordered"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Food Image Url</span>
            </label>
            <input
              type="text"
              name="food_image"
              className="input input-bordered"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">
                Food Quantity (Person to be served)
              </span>
            </label>
            <input
              type="text"
              name="food_quantity"
              required
              className="input input-bordered"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Pickup Location</span>
            </label>
            <input
              type="text"
              required
              name="pickup_location"
              className="input input-bordered"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Expired Date</span>
              </label>
              <input
                type="date"
                required
                min={todayDate}
                onChange={handleDateChange}
                className="input input-bordered w-full"
                style={{ outline: "none" }}
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text">Expired Time</span>
              </label>
              <input
                type="time"
                required
                onChange={handleTimeChange}
                className="input input-bordered w-full"
                style={{ outline: "none" }}
              />
            </div>
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              defaultValue={"+880"}
              name="phone"
              className="input input-bordered w-full"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-3 lg:mx-0">
          <label className="label">
            <span className="label-text">Additional Notes</span>
          </label>
          <textarea
            name="additional_notes"
            placeholder="Write something about your Food..."
            cols="10"
            rows="5"
            className="border px-2 py-1 rounded-xl w-full"
            style={{ outline: "none" }}
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-redFood hover:bg-redFood text-white">
            {loading ? (
              <div className="flex justify-center">
                <TbFidgetSpinner className="animate-spin text-xl my-[2px]" />
              </div>
            ) : (
              "Add Food"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
