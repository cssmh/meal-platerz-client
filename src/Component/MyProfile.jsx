import { toast } from "sonner";
import React, { useState } from "react";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";
import EditProfileModal from "./EditProfileModal";
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
    <div className="min-h-screen bg-gray-100 p-6 md:p-12">
      <PlaterHelmet title={"My Profile"} />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:flex md:items-start">
        {/* Profile Image and Basic Info */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
          <img
            src={photo || defaultAvatar}
            alt="Profile"
            className={`${
              isPremium ? "border-yellow-300" : "border-gray-300"
            } w-32 h-32 rounded-full border-4 shadow-md`}
          />
          <h2 className="text-xl font-semibold text-gray-800 mt-4">{name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 bg-[#f01543] text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Edit Profile
          </button>
        </div>
        <div className="w-full md:w-2/3 mt-6 md:mt-0 md:pl-8 space-y-6">
          <div className="text-gray-600">
            <p className="text-lg font-semibold">Account Details</p>
            <p className="text-sm">
              <span className="font-semibold">Account Created:</span>{" "}
              {new Date(
                parseInt(user?.metadata?.createdAt, 10)
              ).toLocaleDateString()}{" "}
              at{" "}
              {new Date(
                parseInt(user?.metadata?.createdAt, 10)
              ).toLocaleTimeString()}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Last Sign-In:</span>{" "}
              {user?.metadata?.lastSignInTime}
            </p>
          </div>
          {isPremium && (
            <div className="text-green-600 text-center">
              <p className="text-md font-semibold">
                🎉 Congratulations on being a Premium member!
              </p>
              <p className="text-sm">Time Remaining:</p>
              <div className="mt-2 inline-block px-4 py-2 bg-green-100 rounded-lg shadow">
                <Countdown profile={true} />
              </div>
            </div>
          )}
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
