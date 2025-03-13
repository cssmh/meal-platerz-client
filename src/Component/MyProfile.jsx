import axios from "axios";
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
import AdminSetTimer from "./AdminSetTimer";
import useIsAdmin from "../hooks/useIsAdmin";

const MyProfile = () => {
  const { user, updateProfileInfo } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.displayName);
  const [photo, setPhoto] = useState(user?.photoURL || defaultAvatar);
  const apiKey = import.meta.env.VITE_imgBbKey;
  const isPremium = useIsPremium();
  const { isAdmin } = useIsAdmin();
  const { myFoods } = useMyFoods();

  const closeModal = () => setIsOpen(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const file = form.photo.files[0];

    let uploadedPhoto = photo;

    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        if (data.success) {
          uploadedPhoto = data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
        return;
      } finally {
        setIsUploading(false);
      }
    }

    const updateMyAllFoodInfo = { name, photo: uploadedPhoto };

    try {
      updateProfileInfo(name, uploadedPhoto);
      setName(name);
      if (myFoods?.length > 0) {
        const res = await updateMyImgName(user?.email, updateMyAllFoodInfo);
        if (res?.modifiedCount > 0) {
          toast.success("Food information updated");
        }
      }
      toast.success("Profile updated successfully!");
      setPhoto(uploadedPhoto);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="md:min-h-screen bg-gray-100 p-4 md:p-10">
      <PlaterHelmet title={"My Profile"} />
      <div className="max-w-3xl 2xl:max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-5 md:p-8 md:flex md:items-start">
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
          <img
            src={photo}
            alt="Profile"
            className={`${
              isPremium ? "border-yellow-300" : "border-gray-300"
            } w-32 h-32 rounded-full border-4 shadow-md`}
          />
          <h2 className="text-xl 2xl:text-2xl font-semibold text-gray-800 mt-4">
            {name}
          </h2>
          <p className="text-sm 2xl:text-base text-gray-500">{user?.email}</p>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 bg-[#f01543] text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Edit Profile
          </button>
        </div>
        <div className="w-full md:w-2/3 mt-6 md:mt-0 md:pl-8 space-y-6">
          <div className="text-gray-600">
            <p className="text-lg 2xl:text-xl font-semibold">Account Details</p>
            <p className="text-sm 2xl:text-base mb-2">
              <p className="font-semibold">Account Created:</p>{" "}
              <p className="text-sm 2xl:text-base">
                <span className="font-semibold">Last Sign-In:</span>{" "}
                {user?.metadata?.lastSignInTime
                  ? `${new Date(
                      user.metadata.lastSignInTime
                    ).toLocaleDateString("en-BD")} at ${new Date(
                      user.metadata.lastSignInTime
                    ).toLocaleTimeString("en-BD", {
                      timeZone: "Asia/Dhaka",
                      hour12: true,
                    })}`
                  : "N/A"}
              </p>
            </p>
            <p className="text-sm 2xl:text-base">
              <p className="font-semibold">Last Sign-In:</p>{" "}
              {user?.metadata?.lastSignInTime
                ? new Intl.DateTimeFormat("en-BD", {
                    dateStyle: "long",
                    timeStyle: "short",
                    hour12: true,
                    timeZone: "Asia/Dhaka",
                  }).format(new Date(user.metadata.lastSignInTime))
                : "N/A"}
            </p>
          </div>
          {isPremium && (
            <div className="text-green-600 text-center">
              <p className="text-base 2xl:text-lg font-semibold">
                🎉 Congratulations on being a Premium member!
              </p>
              <p className="text-sm 2xl:text-base">Time Remaining:</p>
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
        isUploading={isUploading}
      />
      {isAdmin && <AdminSetTimer />}
    </div>
  );
};

export default MyProfile;
