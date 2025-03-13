import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { addUser } from "../api/users";
import PlaterHelmet from "./PlaterHelmet";
import { PiSpinnerGapLight } from "react-icons/pi";

const Register = () => {
  const [view, setView] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const apiKey = import.meta.env.VITE_imgBbKey;
  const { createNewUser, updateProfileInfo, emailVerification } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoFile = form.photo.files[0];

    try {
      setIsRegistering(true);
      let photoURL = "";

      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );

        if (!imgRes.data.success) {
          throw new Error("Image upload failed. Please try again.");
        }

        photoURL = imgRes.data.data.display_url;
      }

      await createNewUser(email, password);
      await updateProfileInfo(name, photoURL);
      await emailVerification();

      const userData = {
        email: email.toLowerCase(),
        name: name || "anonymous",
        photo: photoURL || "",
      };
      await addUser(userData);

      toast.success("Registration successful");
      navigateTo(location?.state || "/");
    } catch (err) {
      console.log("Add user error", err.response?.data?.message || err.message);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );

        if (!imgRes.data.success) {
          throw new Error("Image upload failed. Please try again.");
        }

        setSelectedImage(imgRes.data.data.display_url);
      } catch (error) {
        console.log("Image upload error", error.message);
        toast.error("Image upload failed. Please try again.");
      } finally {
        setImageUploading(false);
      }
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div className="my-5 space-y-3 rounded-xl lg:max-w-2xl mx-2 md:mx-auto">
      <PlaterHelmet title={"Register"} />
      <h1 className="text-2xl font-semibold text-center">Register Now</h1>
      <form onSubmit={handleRegister} className="space-y-4 mx-2 md:mx-0">
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block text-gray-600 2xl:text-base">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600 2xl:text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-2 text-sm">
          <label htmlFor="photo" className="block text-gray-600 2xl:text-base">
            Upload Profile Image (optional)
          </label>
          <div className="relative flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <div className="text-center">
              {imageUploading ? (
                <p className="text-gray-400">Uploading Image...</p>
              ) : selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-gray-400">Click or drag to upload</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-1 text-sm relative">
          <label
            htmlFor="password"
            className="block text-gray-600 2xl:text-base"
          >
            Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[36px] right-3"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center text-gray-50 bg-[#f01543] rounded-xl"
          disabled={imageUploading || isRegistering}
        >
          {isRegistering ? (
            <div className="flex justify-center">
              <PiSpinnerGapLight className="animate-spin text-xl my-[2px]" />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <p className="text-sm 2xl:text-base text-center text-gray-600 pt-1 pb-2">
        Already have an account?{" "}
        <Link
          to={"/login"}
          rel="noopener noreferrer"
          className="underline text-[#f01543]"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
