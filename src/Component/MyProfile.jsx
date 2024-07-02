import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  const { displayName, email, photoURL, metadata } = user;

  return (
    <div>
      <Helmet>
        <title>MealPlaterz | My Profile</title>
      </Helmet>
      <div className="max-w-xl p-8 sm:flex mx-auto my-8 sm:space-x-6">
        <div className="w-2/3 mb-6 md:w-36">
          <img
            src={photoURL}
            alt="no photo"
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">{displayName}</h2>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-600">{email}</span>
            </span>
            <p className="text-sm text-gray-600 mb-2">
              Account Created:{" "}
              {new Date(parseInt(metadata?.createdAt, 10)).toLocaleString()}
              <span className="flex items-center space-x-2">
                <span className="dark:text-gray-600">
                  LastSign-In {metadata?.lastSignInTime}
                </span>
              </span>
            </p>
            <button className="bg-redFood text-white px-3 py-[5px] rounded-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
