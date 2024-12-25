import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/meal.jpg";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";
import useIsPremium from "../hooks/useIsPremium";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const isPremium = useIsPremium();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowProfileOptions((prev) => !prev);
  };

  const handleLogOut = () => logOut().catch(() => {});

  const getLinkClasses = (path) =>
    location.pathname === path ? "text-blue-500" : "hover:text-blue-500";

  const handleProtectedRoute = (path) => {
    if (!user?.email) {
      toast.info("Please log in to purchase Premium membership.");
    }
    navigate(path);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrolled(window.scrollY > 530);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-white shadow-sm ${
        isHome
          ? isScrolled
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 w-52"
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
                {user && (
                  <Link
                    to="/add-food"
                    className={`flex items-center p-[2px] ${getLinkClasses(
                      "/add-food"
                    )}`}
                  >
                    Add Food
                  </Link>
                )}
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
                  <>
                    <Link
                      to="/manage-my-foods"
                      className={`flex items-center p-[2px] ${getLinkClasses(
                        "/manage-my-foods"
                      )}`}
                    >
                      My Foods
                    </Link>
                    <Link
                      to="/my-food-request"
                      className={`flex items-center p-[2px] ${getLinkClasses(
                        "/my-food-request"
                      )}`}
                    >
                      My Request
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <Link to="/" className="flex items-center md:gap-1">
              <img src={logo} className="w-0 md:w-10 md:mr-1" alt="Logo" />
              <h1 className="font-semibold lg:text-[21px] px-0">MealPlaterz</h1>
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
              {user && (
                <Link
                  to="/add-food"
                  className={`flex items-center p-2 ${getLinkClasses(
                    "/add-food"
                  )}`}
                >
                  Add Food
                </Link>
              )}
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
                  } w-9 h-9 rounded-full mr-2`}
                  alt="avatar"
                />
              </label>
              {user?.email && showProfileOptions && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] shadow-lg bg-white rounded-lg w-48 border border-gray-200 space-y-1"
                >
                  <li>
                    <Link to="/my-profile" className="rounded-lg text-gray-700">
                      <span className="font-medium">View Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user-analytics"
                      className="rounded-lg text-gray-700"
                    >
                      <span className="font-medium">User Analytics</span>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            {user?.email ? (
              <button
                onClick={handleLogOut}
                className="bg-[#f01543] rounded-md text-white py-1 px-2"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <p className="bg-[#f01543] rounded-md text-white py-1 px-2">
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
