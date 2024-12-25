import axios from "axios";
import moment from "moment";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import { updateMyFoods } from "../api/Foods";

const UpdateMyFood = ({ foodData, food_status, refetch }) => {
  const apiKey = import.meta.env.VITE_imgBbKey;
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(foodData.food_image || "");
  const [foodImageUrl, setFoodImageUrl] = useState(foodData.food_image || "");
  const [open, setOpen] = useState(false);
  const [expirationDate, setExpirationDate] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const [todayDate, setTodayDate] = useState("");

  const {
    _id,
    food_name,
    food_quantity,
    donator_phone,
    donator_email,
    pickup_location,
    expiration_date,
    expiration_time,
    additional_notes,
  } = foodData;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayDate(today);
    setExpirationDate(
      moment(expiration_date, "YYYY-MM-DD").format("YYYY-MM-DD")
    );
    setExpirationTime(moment(expiration_time, "hh:mm A").format("HH:mm"));
    setExpiredDate(moment(expiration_date, "YYYY-MM-DD").format("YYYY-MM-DD"));
    setExpiredTime(moment(expiration_time, "hh:mm A").format("HH:mm"));
  }, [expiration_date, expiration_time]);

  const handleDateChange = (e) => setExpiredDate(e.target.value);
  const handleTimeChange = (e) => setExpiredTime(e.target.value);

  const handlePopUp = () => setOpen(true);
  const closePop = () => setOpen(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        setLoading(true);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        setFoodImageUrl(res.data.data.url);
        setImagePreview(res.data.data.url);
      } catch (error) {
        console.error("Error uploading image", error);
        swal("Error", "Failed to upload image", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const updatedFoodData = {
      food_name: form.food_name.value,
      food_image: foodImageUrl, // Use the ImgBB URL
      food_quantity: parseInt(form.food_quantity.value),
      donator_phone: form.donator_phone.value,
      expiration_date: expiredDate,
      expiration_time: `${formatTime(expiredTime)}`,
      pickup_location: form.pickup_location.value,
      additional_notes: form.additional_notes.value,
      food_status: "available",
    };

    try {
      const res = await updateMyFoods(_id, donator_email, updatedFoodData);
      if (res?.modifiedCount > 0) {
        refetch();
        swal("Good job!", "Food Info Updated", "success", { timer: 2000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
      setLoading(false);
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
            {imagePreview && (
              <div className="w-full max-w-xs mx-auto">
                <img
                  src={imagePreview}
                  alt="Food Preview"
                  className="object-cover w-full h-32 rounded-md"
                />
              </div>
            )}
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
                  <span className="label-text">Food Image</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="input input-bordered p-2"
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
              <div className="form-control md:w-2/3 mx-3 lg:mx-0">
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
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-full mx-3 lg:mx-0">
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

            {/* Additional Notes */}
            <div className="form-control w-full mx-3 lg:mx-0 mt-4">
              <label className="label">
                <span className="label-text">Additional Notes</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Additional Notes"
                defaultValue={additional_notes}
                name="additional_notes"
                style={{ outline: "none" }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                color="success"
              >
                {loading ? "Updating..." : "Update Food"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateMyFood;
