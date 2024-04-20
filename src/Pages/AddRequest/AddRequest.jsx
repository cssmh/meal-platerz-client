import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";

const AddRequest = ({ getFood }) => {
  const { user } = useContextHook();
  const {
    foodName,
    foodImage,
    foodDonatorEmail,
    donatorName,
    pickupLocation,
    expiredDateTime,
  } = getFood;

  const [open, setOpen] = useState(false);
  const [todayDateTime, setTodayDateTime] = useState("");
  console.log(todayDateTime);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DDTHH:mm");
    setTodayDateTime(today);
  }, []);

  const handlePopUp = () => {
    setOpen(true);
  };

  const closePop = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handlePopUp} color="error" variant="contained">
        Request for this food
      </Button>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogActions>
          <Button onClick={closePop} color="info">
            x
          </Button>
        </DialogActions>
        <DialogContent>
          <form className="md:w-[65%] mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Book Name</span>
                </label>
                <input
                  type="text"
                  readOnly
                  name="book_name"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Book Image URL</span>
                </label>
                <input
                  type="text"
                  readOnly
                  name="book_image_URL"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  name="book_purchaser_email"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Book Provider Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  name="book_provider_email"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Phone Number</span>
                </label>
                <input
                  type="text"
                  required
                  name="phone"
                  defaultValue="+880"
                  className="input input-bordered"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="form-control mx-3 lg:mx-0">
              <label className="label">
                <span className="label-text">
                  Any Message for Book Provider?
                </span>
              </label>
              <textarea
                name="instruction"
                cols="5"
                rows="5"
                className="border p-1 rounded-xl"
                style={{ outline: "none" }}
              ></textarea>
            </div>
            <div className="form-control mt-5">
              <button className="btn btn-outline border-none bg-green-400 hover:bg-green-400 text-white">
                Purchase Book
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRequest;
