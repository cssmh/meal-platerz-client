import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { useState } from "react";

const UpdateMyFood = ({ foodInfo }) => {
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    donator_phone,
    pickup_location,
    food_status,
    additional_notes,
  } = foodInfo;

  const [open, setOpen] = useState(false);
  const [expiredDate, setExpiredDate] = useState("");
  const [expiredTime, setExpiredTime] = useState("");

  const handleDateChange = (e) => {
    setExpiredDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setExpiredTime(e.target.value);
  };

  const formattedDate = moment(expiredDate).format("DD-MM-YYYY");
  const formattedTime = moment(expiredTime, "HH:mm").format("hh:mm A");

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
    const food_image = form.food_image.value;
    const food_quantity = parseInt(form.food_quantity.value);
    const donator_phone = form.donator_phone.value;
    const expired_date = formattedDate;
    const expired_time = formattedTime;
    const pickup_location = form.pickup_location.value;
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
    };

    axios
      .put(`http://localhost:5000/update-food/${_id}`, updatedFoodData)
      .then((res) => {
        console.log(res.data);
        if (res.data?.modifiedCount > 0) {
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
      <Button onClick={handlePopUp} color="success" variant="contained">
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
                  defaultValue={food_image}
                  name="food_image"
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
                      required
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
