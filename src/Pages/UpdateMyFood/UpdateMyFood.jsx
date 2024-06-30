import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import moment from "moment";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { updateMyFood } from "../../api/Foods";

const UpdateMyFood = ({ foodData, setFoodData, food_status, refetch }) => {
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    donator_phone,
    donator_email,
    pickup_location,
    expired_date,
    expired_time,
    additional_notes,
  } = foodData;

  const [open, setOpen] = useState(false);
  const [expiredTime, setExpiredTime] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [todayDate, setTodayDate] = useState("");

  // To avoid yesterday date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
    setExpiredDate(today);
  }, []);
  // To avoid yesterday date end

  useEffect(() => {
    setExpiredDate(moment(expired_date, "DD-MM-YYYY").format("YYYY-MM-DD"));
    setExpiredTime(moment(expired_time, "HH:mm").format("HH:mm"));
  }, [expired_date, expired_time]);

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

  const handleUpdateFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image_url.value;
    const food_quantity = parseInt(form.food_quantity.value);
    const donator_phone = form.donator_phone.value;
    const expired_date = moment(expiredDate).format("DD-MM-YYYY");
    const expired_time = moment(expiredTime, "HH:mm").format("hh:mm A");
    const pickup_location = form.pickup_location.value;
    const food_status = "available";
    const additional_notes = form.additional_notes.value;

    const updatedFoodData = {
      food_name,
      food_image,
      food_quantity,
      donator_phone,
      expired_date,
      expired_time,
      pickup_location,
      additional_notes,
      food_status,
    };

    updateMyFood(_id, donator_email, updatedFoodData)
      .then((data) => {
        if (data?.modifiedCount > 0) {
          refetch();
          setFoodData(updatedFoodData);
          swal("Good job!", "Food Info Updated", "success");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <div>
      <Button
        className={`${food_status === "Unavailable" && "pointer-events-none"}`}
        onClick={handlePopUp}
        color="success"
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
                      value={expiredDate}
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
                      value={expiredTime}
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
