import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/meal.jpg";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";
import useExpired from "../hooks/useExpired";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const isExpired = useExpired();
  const location = useLocation();
  const userRef = useRef(null);

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const getLinkClasses = (path) => {
    return location.pathname === path ? "text-blue-500" : "hover:text-blue-500";
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* <div className="bg-primary/50 py-[1px]">
        <p className="text-[13px] text-white px-3 md:px-12">
          Contact: +880176761606*
        </p>
      </div> */}
      <div className="border-b border-base-300">
        <div className="navbar min-h-[58px] max-w-7xl mx-auto py-0">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm btn-ghost lg:hidden">
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
                {user?.email && (
                  <>
                    <Link
                      to="/add-food"
                      className={`flex items-center p-[2px] ${getLinkClasses(
                        "/add-food"
                      )}`}
                    >
                      Add Food
                    </Link>
                    <Link
                      to="/be-premium"
                      className={`flex items-center p-[2px] ${getLinkClasses(
                        "/be-premium"
                      )}`}
                    >
                      Be Premium
                    </Link>
                    <Link
                      to="/manage-my-foods"
                      className={`flex items-center p-[2px] ${getLinkClasses(
                        "/manage-my-foods"
                      )}`}
                    >
                      Manage My Foods
                    </Link>
                    <Link
                      to="/my-food-request"
                      className={`flex items-center p-[2px] ${getLinkClasses(
                        "/my-food-request"
                      )}`}
                    >
                      My Food Request
                    </Link>
                  </>
                )}
              </ul>
            </div>
            <img src={logo} className="w-0 md:w-10 md:mr-1" alt="Logo" />
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
              {user?.email && (
                <>
                  <Link
                    to="/add-food"
                    className={`flex items-center px-2 ${getLinkClasses(
                      "/add-food"
                    )}`}
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/be-premium"
                    className={`flex items-center p-2 ${getLinkClasses(
                      "/be-premium"
                    )}`}
                  >
                    Be Premium
                  </Link>
                </>
              )}
              {user?.email && (
                <li tabIndex={0}>
                  <details>
                    <summary>Dashboard</summary>
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
              <label tabIndex={0} onClick={handleProfileClick}>
                <img
                  src={user?.photoURL || defaultAvatar}
                  className={`${
                    !isExpired && "border-[3px] border-yellow-500"
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
                className="bg-redFood rounded-md text-white py-1 px-[10px]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <p className="bg-redFood rounded-md text-white py-1 px-[10px]">
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
