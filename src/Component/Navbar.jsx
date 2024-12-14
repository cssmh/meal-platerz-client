import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/meal.jpg";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";
import useIsPremium from "../hooks/useIsPremium";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDown, setIsDown] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const isPremium = useIsPremium();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const getLinkClasses = (path) => {
    return location.pathname === path ? "text-blue-500" : "hover:text-blue-500";
  };

  const handleProtectedRoute = (path) => {
    if (!user?.email) {
      toast.info("Please log in first to access this feature.");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 530) {
        setIsDown(true);
      } else {
        setIsDown(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-white shadow-sm ${
        isHome
          ? isDown
            ? "bg-opacity-100"
            : "bg-opacity-40"
          : "bg-opacity-100"
      }`}
    >
      {/* <div className="bg-primary/40 py-[1px]">
        <p className="text-[13px] text-white px-3 md:px-12">
          Contact: +880176761606* Offer!! Be our premium member!!
        </p>
      </div> */}
      {/* <footer className="bg-gray-800 text-white py-4">
        <p className="text-center text-xs">
          Have a story to share? Contact us at +8801767616067.
        </p>
      </footer> */}
      <div className="border-b border-base-300">
        <div className="navbar min-h-[58px] md:px-10 py-0">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-sm btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <Link
                  to="/"
                  className={`flex items-center p-[2px] ${getLinkClasses("/")}`}
                >
                  Home
                </Link>
                <Link
                  to="/available-foods"
                  className={`flex items-center p-[2px] ${getLinkClasses(
                    "/available-foods"
                  )}`}
                >
                  Available Foods
                </Link>
                <button
                  onClick={() => handleProtectedRoute("/add-food")}
                  className={`flex items-center p-[2px] ${getLinkClasses(
                    "/add-food"
                  )}`}
                >
                  Add Food
                </button>
                <button
                  onClick={() => handleProtectedRoute("/be-premium")}
                  className={`flex items-center p-[2px] ${getLinkClasses(
                    "/be-premium"
                  )}`}
                >
                  Be Premium
                </button>
                <Link
                  to="/all-reviews"
                  className={`flex items-center p-[2px] ${getLinkClasses(
                    "/all-reviews"
                  )}`}
                >
                  All Reviews
                </Link>
                {user?.email && (
                  <Link
                    to="/manage-my-foods"
                    className={`flex items-center p-[2px] ${getLinkClasses(
                      "/manage-my-foods"
                    )}`}
                  >
                    My Foods
                  </Link>
                )}
                {user?.email && (
                  <Link
                    to="/my-food-request"
                    className={`flex items-center p-[2px] ${getLinkClasses(
                      "/my-food-request"
                    )}`}
                  >
                    My Request
                  </Link>
                )}
              </ul>
            </div>
            <img src={logo} className="w-10 md:mr-1" alt="Logo" />
            <Link to="/" className="font-semibold lg:text-[21px] px-0">
              MealPlaterz
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <Link
                to="/"
                className={`flex items-center p-2 ${getLinkClasses("/")}`}
              >
                Home
              </Link>
              <Link
                to="/available-foods"
                className={`flex items-center p-2 ${getLinkClasses(
                  "/available-foods"
                )}`}
              >
                Available Foods
              </Link>
              <button
                onClick={() => handleProtectedRoute("/add-food")}
                className={`flex items-center p-2 ${getLinkClasses(
                  "/add-food"
                )}`}
              >
                Add Food
              </button>
              <button
                onClick={() => handleProtectedRoute("/be-premium")}
                className={`flex items-center p-2 ${getLinkClasses(
                  "/be-premium"
                )}`}
              >
                Be Premium
              </button>
              <Link
                to="/all-reviews"
                className={`flex items-center p-2 ${getLinkClasses(
                  "/all-reviews"
                )}`}
              >
                All Reviews
              </Link>
              {user?.email && (
                <li tabIndex={0}>
                  <details>
                    <summary className="px-2">Dashboard</summary>
                    <ul className="menu menu-sm dropdown-content z-[1] w-[170px]">
                      <Link
                        to="/manage-my-foods"
                        className={`flex items-center p-[3px] ${getLinkClasses(
                          "/manage-my-foods"
                        )}`}
                      >
                        Manage My Foods
                      </Link>
                      <Link
                        to="/my-food-request"
                        className={`flex items-center p-[3px] ${getLinkClasses(
                          "/my-food-request"
                        )}`}
                      >
                        My Food Request
                      </Link>
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-end">
            {user?.email && (
              <p className="hidden md:block text-sm bg-base-300 px-2 py-1 rounded mr-2">
                {user?.displayName}
              </p>
            )}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="cursor-pointer"
                onClick={handleProfileClick}
              >
                <img
                  src={user?.photoURL || defaultAvatar}
                  className={`${
                    user?.email && isPremium
                      ? "border-[3px] border-yellow-500"
                      : ""
                  } w-9 rounded-full mr-2`}
                  alt="avatar"
                />
              </label>
              {user?.email && showProfileOptions && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <p className="pointer-events-none">
                      Hi, {user?.displayName}
                    </p>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      View Profile
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {user?.email ? (
              <button
                onClick={handleLogOut}
                className="bg-redFood rounded-md text-white py-1 px-2"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <p className="bg-redFood rounded-md text-white py-1 px-2">
                  Login
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
