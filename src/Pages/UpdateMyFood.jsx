import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { updateMyFoods } from "../api/Foods";
import moment from "moment";

const UpdateMyFood = ({ foodData, food_status, refetch }) => {
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    donator_phone,
    donator_email,
    pickup_location,
    expiration_date,
    expiration_time,
    additional_notes,
  } = foodData;

  const [open, setOpen] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
    // Initialize expirationDate and expirationTime based on props
    setExpirationDate(
      moment(expiration_date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    setExpirationTime(moment(expiration_time, "hh:mm A").format("HH:mm"));
    // Also set expiredDate and expiredTime initially
    setExpiredDate(moment(expiration_date, "YYYY-MM-DD").format("YYYY-MM-DD"));
    setExpiredTime(moment(expiration_time, "hh:mm A").format("HH:mm"));
  }, [expiration_date, expiration_time]);

  const handleDateChange = (e) => {
    setExpiredDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setExpiredTime(e.target.value);
  };

  const handlePopUp = () => {
    setOpen(true);
  };

  const closePop = () => {
    setOpen(false);
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image_url.value;
    const food_quantity = parseInt(form.food_quantity.value);
    const donator_phone = form.donator_phone.value;
    const pickup_location = form.pickup_location.value;

    const updatedFoodData = {
      food_name,
      food_image,
      food_quantity,
      donator_phone,
      expiration_date: `${expiredDate}`,
      expiration_time: `${formatTime(expiredTime)}`,
      pickup_location,
      additional_notes: form.additional_notes.value,
      food_status: "available",
    };

    const res = await updateMyFoods(_id, donator_email, updatedFoodData);
    try {
      if (res?.modifiedCount > 0) {
        refetch();
        swal("Good job!", "Food Info Updated", "success", { timer: 2000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const formattedTime = new Date(`2000-01-01T${hours}:${minutes}:00`);
    return formattedTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      <Button
        className={`${food_status === "Unavailable" && "pointer-events-none"}`}
        onClick={handlePopUp}
        color={food_status === "available" ? "success" : "inherit"}
        variant="contained"
      >
        Edit
      </Button>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogActions>
          <Button onClick={closePop} color="error">
            x
          </Button>
        </DialogActions>
        <DialogContent>
          <form onSubmit={handleUpdateFood} className="md:w-[70%] mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={food_name}
                  name="food_name"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Food Image URL</span>
                </label>
                <input
                  type="text"
                  name="food_image_url"
                  defaultValue={food_image}
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Food Quantity</span>
                </label>
                <input
                  type="text"
                  defaultValue={food_quantity}
                  name="food_quantity"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  defaultValue={donator_phone}
                  name="donator_phone"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <div className="flex-1 flex flex-col md:flex-row gap-3">
                  <div className="w-full">
                    <label className="label">
                      <span className="label-text">Expired Date</span>
                    </label>
                    <input
                      type="date"
                      min={todayDate}
                      defaultValue={expirationDate}
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
                      defaultValue={expirationTime}
                      onChange={handleTimeChange}
                      className="input input-bordered w-full"
                      style={{ outline: "none" }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Pickup Location</span>
                </label>
                <input
                  type="text"
                  name="pickup_location"
                  defaultValue={pickup_location}
                  className="input input-bordered"
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
                cols="5"
                rows="5"
                defaultValue={additional_notes}
                className="border p-1 rounded-xl"
                style={{ outline: "none" }}
              ></textarea>
            </div>
            <div className="form-control mt-5">
              <button className="btn btn-outline border-none bg-red-400 hover:bg-red-400 text-white">
                Update Food
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateMyFood;
