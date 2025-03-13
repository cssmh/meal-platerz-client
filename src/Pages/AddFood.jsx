import swal from "sweetalert";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { addFood } from "../api/Foods";
import useMyFoods from "../hooks/useMyFoods";
import { toast } from "sonner";
import PlaterHelmet from "../Component/PlaterHelmet";
import axios from "axios";
import { PiSpinnerGapLight } from "react-icons/pi";

const AddFood = () => {
  const { user } = useAuth();
  const apiKey = import.meta.env.VITE_imgBbKey;
  const [loading, setLoading] = useState(false);
  const [expiredDate, setExpiredDate] = useState("");
  const [expiredTime, setExpiredTime] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
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
      setImageUrl(response.data.data.url);
      setImagePreview(URL.createObjectURL(file));
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

    const foodInfo = {
      food_name,
      food_image: imageUrl,
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
    <div className="mt-5 pb-6">
      <PlaterHelmet title={"Add Food"} />
      <form
        onSubmit={handleAddFood}
        className="max-w-[950px] 2xl:max-w-[75%] mx-auto space-y-1 md:space-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3">
          <div className="form-control mx-4 lg:mx-0">
            <label className="label">
              <span className="label-text 2xl:text-lg">Food Name</span>
            </label>
            <input
              type="text"
              name="food_name"
              required
              className="h-[42px] 2xl:h-14 input input-bordered"
              style={{ outline: "none" }}
            />
          </div>{" "}
          <div className="form-control mx-4 lg:mx-0">
            <label className="label">
              <span className="label-text 2xl:text-lg">
                Food Quantity (Person to be served)
              </span>
            </label>
            <input
              type="number"
              name="food_quantity"
              required
              className="h-[42px] 2xl:h-14 input input-bordered"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control mx-4 lg:mx-0">
            <label className="label">
              <span className="label-text 2xl:text-lg">Pickup Location</span>
            </label>
            <input
              type="text"
              required
              name="pickup_location"
              className="h-[42px] 2xl:h-14 input input-bordered"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-4 lg:mx-0">
          <label className="label">
            <span className="label-text 2xl:text-lg">Food Image</span>
          </label>
          <div
            className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg cursor-pointer"
            onClick={() => document.getElementById("image-upload").click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Food"
                className="h-36 w-40 object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-500">Click to upload an image</span>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered hidden"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3">
          <div className="form-control mx-4 lg:mx-0">
            <label className="label">
              <span className="label-text 2xl:text-lg">Phone Number</span>
            </label>
            <input
              type="text"
              defaultValue={"+880"}
              name="phone"
              className="h-[42px] 2xl:h-14 input input-bordered w-full"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control mx-4 lg:mx-0">
            <label className="label">
              <span className="label-text 2xl:text-lg">Expired Date</span>
            </label>
            <input
              type="date"
              required
              min={todayDate}
              onChange={handleDateChange}
              className="h-[42px] 2xl:h-14 input input-bordered w-full"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control mx-4 lg:mx-0">
            <label className="label">
              <span className="label-text 2xl:text-lg">Expired Time</span>
            </label>
            <input
              type="time"
              required
              onChange={handleTimeChange}
              className="h-[42px] 2xl:h-14 input input-bordered w-full"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-4 lg:mx-0">
          <label className="label">
            <span className="label-text 2xl:text-lg">Additional Notes</span>
          </label>
          <textarea
            name="additional_notes"
            placeholder="Write something about your Food..."
            rows="4"
            className="border px-3 py-2 rounded-lg w-full"
            style={{ outline: "none" }}
          ></textarea>
        </div>
        <div className="form-control pt-3 2xl:pt-4 mx-3 md:mx-0">
          <button
            type="submit"
            className="btn bg-[#f01543] 2xl:text-lg hover:bg-[#f01543] text-white"
          >
            {loading ? (
              <div className="flex justify-center">
                <PiSpinnerGapLight className="animate-spin text-xl my-[2px]" />
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
