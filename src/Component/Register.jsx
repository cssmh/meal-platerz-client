import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import defaultAvatar from "../assets/default.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { addUser } from "../api/users";
import PlaterHelmet from "./PlaterHelmet";

const Register = () => {
  const [view, setView] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
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
      setImageUploading(true);
      const formData = new FormData();
      formData.append("image", photoFile);
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      if (!imgRes.data.success) {
        throw new Error("Image upload failed. Please try again.");
      }
      const photoURL = imgRes.data.data.display_url || defaultAvatar;

      await createNewUser(email, password);
      await updateProfileInfo(name, photoURL);
      await emailVerification();

      const userData = {
        email: email.toLowerCase(),
        name: name,
        photo: photoURL,
      };
      await addUser(userData);

      toast.success("Registration successful");
      navigateTo(location?.state || "/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="my-6 space-y-3 rounded-xl lg:w-1/2 mx-2 md:mx-auto">
      <PlaterHelmet title={"Register"} />
      <h1 className="text-2xl font-semibold text-center">Register</h1>
      <form onSubmit={handleRegister} className="space-y-5">
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block dark:text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="photo" className="block dark:text-gray-600">
            Upload Profile Image
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm relative">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border"
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
          className="block w-full p-3 text-center dark:text-gray-50 dark:bg-[#f01543] rounded-xl"
          disabled={imageUploading}
        >
          {imageUploading ? "Uploading Image..." : "Register"}
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 pt-1">
        Already have an account?{" "}
        <Link
          to={"/login"}
          rel="noopener noreferrer"
          className="underline dark:text-redFood"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
