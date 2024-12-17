import swal from "sweetalert";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { addFood } from "../api/Foods";
import useMyFoods from "../hooks/useMyFoods";
import { toast } from "sonner";
import PlaterHelmet from "../Component/PlaterHelmet";
import axios from "axios";

const AddFood = () => {
  const { user } = useAuth();
  const apiKey = import.meta.env.VITE_imgBbKey;
  const [loading, setLoading] = useState(false);
  const [expiredDate, setExpiredDate] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Store image URL
  const { myFoods, refetch } = useMyFoods();

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      setImageUrl(response.data.data.url); // Set image URL after successful upload
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const food_name = form.food_name.value;
    const food_quantity = parseInt(form.food_quantity.value);
    const donator_name = user?.displayName;
    const donator_image = user?.photoURL;
    const donator_email = user?.email;
    const donator_phone = form.phone.value;

    const isDuplicate = myFoods?.find((food) => food.food_name === food_name);
    if (isDuplicate) {
      setLoading(false);
      return toast.warning("You already added this Food!");
    }
    if (!/^[0-9]+$/.test(food_quantity)) {
      setLoading(false);
      return toast.warning("Use only numbers for food quantity");
    }

    const foodInfo = {
      food_name,
      food_image: imageUrl, // Use the uploaded image URL
      food_quantity,
      donator_name,
      donator_image,
      donator_email,
      donator_phone,
      expiration_date: `${expiredDate}`,
      expiration_time: `${formatTime(expiredTime)}`,
      pickup_location: form.pickup_location.value,
      food_status: "available",
      additional_notes: form.additional_notes.value,
    };

    try {
      const res = await addFood(foodInfo);
      if (res?.insertedId) {
        swal("Thank You!", `${food_name} added`, "success", { timer: 2000 });
        refetch();
        form.reset();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error adding food:", error);
      swal("Oops!", "Failed to add food. Please try again later.", "error", {
        timer: 2000,
      });
    } finally {
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
    <div className="my-5">
      <PlaterHelmet title={"Add Food"} />
      <form
        onSubmit={handleAddFood}
        className="max-w-6xl 2xl:max-w-[82%] mx-auto"
      >
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
              <span className="label-text">Food Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="input input-bordered p-2"
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
          <button
            disabled={loading}
            className="btn bg-[#f01543] hover:bg-[#f01543] text-white"
          >
            {loading ? (
              <div className="flex justify-center">
                <p>Submitting...</p>
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
