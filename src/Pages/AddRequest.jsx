import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Switch,
  FormControlLabel,
} from "@mui/material";
import moment from "moment";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addReq } from "../api/Foods";
import useIsPremium from "../hooks/useIsPremium";
import useMyRequest from "../hooks/useMyRequest";

const AddRequest = ({ getFood }) => {
  const [open, setOpen] = useState(false);
  const [todayDateTime, setTodayDateTime] = useState("");
  const { myFoodRequest, user, refetch } = useMyRequest();
  const isPremium = useIsPremium();
  const [freeDelivery, setFreeDelivery] = useState(false);

  const {
    _id,
    food_name,
    food_image,
    donator_email,
    donator_name,
    donator_phone,
    pickup_location,
    expiration_date,
    expiration_time,
  } = getFood;

  useEffect(() => {
    setTodayDateTime(moment().format("YYYY-MM-DD hh:mm A"));
  }, []);

  const handlePopUp = () => {
    const user_email = user?.email;
    const hasRequest = myFoodRequest.some(
      (request) =>
        request.user_email === user_email && request.food_name === food_name
    );

    if (hasRequest) {
      swal({
        text: "You already requested this food!",
        icon: "error",
        timer: 2000,
      });
      return;
    }
    setOpen(true);
  };

  const closePop = () => setOpen(false);

  const handleAddRequest = async (e) => {
    e.preventDefault();
    const form = e.target;
    const food_id = _id;
    const user_name = user?.displayName;
    const user_image = user?.photoURL;
    const user_email = user?.email;
    const user_phone = form.user_phone.value;
    const request_date = todayDateTime;
    const message_to_donator = form.message_to_donator.value;
    const donation = form.donation_money.value;
    const donation_money = Number(donation) > 0 ? donation : 0;
    const status = "Pending";

    if (!/^[1-9]\d*$/.test(donation)) {
      toast.info("The donation amount is invalid");
      return;
    }
    if (!/^(\+?8801|01)\d{9}$/.test(user_phone)) {
      toast.info("Enter a valid phone number!");
      return;
    }

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
      expiration_date,
      expiration_time,
      status,
      donation_money,
      message_to_donator,
      free_delivery: isPremium && freeDelivery,
    };

    try {
      const res = await addReq(requestFoodData);
      if (res?.insertedId) {
        refetch();
        swal("Congratulations!", "Request added", "success", { timer: 3000 });
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while adding the request.");
    }
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
                  type="email"
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
                  defaultValue={"+880"}
                  required
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
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
              <div className="form-control md:w-2/3 mx-auto lg:mx-0 flex justify-center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isPremium && freeDelivery}
                      onChange={() =>
                        isPremium ? setFreeDelivery((prev) => !prev) : null
                      }
                      disabled={!isPremium}
                      color="success"
                    />
                  }
                  label={
                    isPremium
                      ? "Get Free Delivery"
                      : "Be premium member to get Free delivery"
                  }
                  labelPlacement="end"
                  style={{ marginTop: 16 }}
                />
              </div>
            </div>
            <div className="form-control mx-3 lg:mx-0 mt-4">
              <textarea
                name="message_to_donator"
                cols="5"
                placeholder="Any Message for Donator?"
                rows="5"
                className="border p-1 rounded-xl"
                style={{ outline: "none" }}
              ></textarea>
            </div>
            <div className="form-control mt-5">
              <button className="btn btn-outline border-none bg-red-400 hover:bg-red-400 text-white">
                Request for This Food
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRequest;
