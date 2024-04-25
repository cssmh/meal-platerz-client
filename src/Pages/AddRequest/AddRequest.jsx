import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";
import axios from "axios";
import swal from "sweetalert";

const AddRequest = ({ getFood }) => {
  const { user } = useContextHook();
  console.log(user);
  const {
    _id,
    food_name,
    food_image,
    donator_email,
    donator_name,
    donator_phone,
    pickup_location,
    expired_date,
    expired_time,
  } = getFood;
  console.log(getFood);

  const [open, setOpen] = useState(false);
  const [todayDateTime, setTodayDateTime] = useState("");

  useEffect(() => {
    const today = moment().format("DD-MM-YYYY hh:mm A");
    setTodayDateTime(today);
  }, []);

  const handlePopUp = () => {
    setOpen(true);
  };

  const closePop = () => {
    setOpen(false);
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_id = _id;
    const user_name = user?.displayName;
    const user_image = user?.photoURL;
    const user_email = user?.email;
    const user_phone = form.user_phone.value;
    const request_date = todayDateTime;
    const message_to_donator = form.message_to_donator.value;
    const donation_money = parseInt(form.donation_money.value);
    const status = "Pending";

    const requestFoodData = {
      food_id,
      food_name,
      food_image,
      donator_email,
      donator_name,
      donator_phone,
      user_name,
      user_image,
      user_email,
      user_phone,
      request_date,
      pickup_location,
      expired_date,
      expired_time,
      message_to_donator,
      donation_money,
      status,
    };

    axios
      .post("http://localhost:5000/addRequest", requestFoodData)
      .then((res) => {
        if (res.data?.insertedId) {
          swal("Congratulations!", "Request Complete", "success");
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
      <Button onClick={handlePopUp} color="error" variant="contained">
        Request for this food
      </Button>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogActions>
          <Button onClick={closePop} color="error">
            x
          </Button>
        </DialogActions>
        <DialogContent>
          <form onSubmit={handleAddRequest} className="md:w-[70%] mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={food_name}
                  name="food_name"
                  readOnly
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Donator Email</span>
                </label>
                <input
                  type="text"
                  name="donator_email"
                  defaultValue={donator_email}
                  readOnly
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Phone</span>
                </label>
                <input
                  type="text"
                  name="user_phone"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Request Date (Today)</span>
                </label>
                <input
                  type="text"
                  defaultValue={todayDateTime}
                  readOnly
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Donate Some Money</span>
                </label>
                <input
                  type="text"
                  name="donation_money"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="form-control mx-3 lg:mx-0">
              <label className="label">
                <span className="label-text">Any Message for Donator?</span>
              </label>
              <textarea
                name="message_to_donator"
                cols="5"
                rows="5"
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

export default AddRequest;
