import React, { useState } from "react";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";
import EditProfileModal from "../Pages/Modal/EditProfileModal";
import toast from "react-hot-toast";
import useMyFoods from "../hooks/useMyFoods";
import { updateMyImgName } from "../api/Foods";
import Countdown from "./Countdown";
import useIsPremium from "../hooks/useIsPremium";
import PlaterHelmet from "./PlaterHelmet";

const MyProfile = () => {
  const { user, updateProfileInfo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.displayName);
  const [photo, setPhoto] = useState(user?.photoURL);
  const isPremium = useIsPremium();
  const { myFoods } = useMyFoods();

  const closeModal = () => setIsOpen(false);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value || defaultAvatar;
    const updateMyAllFoodInfo = {
      name,
      photo,
    };
    try {
      updateProfileInfo(name, photo);
      setName(name);
      if (myFoods?.length > 0) {
        const res = await updateMyImgName(user?.email, updateMyAllFoodInfo);
        if (res?.modifiedCount > 0) {
          toast.success("Food information updated");
        }
      }
      toast.success("Updated Successfully");
      setPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <PlaterHelmet title={"My Profile"} />
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-32 h-32 mb-6 sm:mb-0 sm:w-48 sm:h-48">
            <img
              src={photo || defaultAvatar}
              alt="Profile"
              className={`${
                isPremium ? "border-yellow-300" : "border-gray-300"
              } object-center w-full h-full rounded-full border-4 shadow-md`}
            />
          </div>
          <div className="flex flex-col space-y-4 sm:ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <div className="flex flex-col space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span>{user?.email}</span>
              </div>
              <p className="text-sm">
                Account Created:{" "}
                {new Date(
                  parseInt(user?.metadata?.createdAt, 10)
                ).toLocaleDateString()}{" "}
                at{" "}
                {new Date(
                  parseInt(user?.metadata?.createdAt, 10)
                ).toLocaleTimeString()}
              </p>
              <p className="text-sm">
                Last Sign-In: {user?.metadata?.lastSignInTime}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          {isPremium && (
            <>
              <p className="text-md font-semibold text-green-600">
                Congratulations on being a Premium member!
              </p>
              <p className="text-md my-2">Time Remaining:</p>
            </>
          )}
          <div className="p-3 bg-gray-200 rounded-lg shadow-md inline-block">
            <Countdown />
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isOpen}
        closeModal={closeModal}
        handleUpdateProfile={handleUpdateProfile}
        name={name}
        photo={photo}
      />
    </div>
  );
};

export default MyProfile;
