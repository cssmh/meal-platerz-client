import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/meal.jpg";
import defaultAvatar from "../assets/default.jpg";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* <div className="bg-primary/50 py-[1px]">
        <p className="text-[13px] text-white px-3 md:px-12">
          Contact: +880176761606*
        </p>
      </div> */}
      <div className="border-b border-base-300">
        <div className="navbar min-h-[60px] max-w-7xl mx-auto py-0">
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
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/available-foods"
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    Available Foods
                  </NavLink>
                </li>
                {user?.email && (
                  <>
                    <li>
                      <NavLink
                        to="/add-food"
                        className={({ isActive }) =>
                          isActive ? "text-blue-500" : ""
                        }
                      >
                        Add Food
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/manage-my-foods"
                        className={({ isActive }) =>
                          isActive ? "text-blue-500" : ""
                        }
                      >
                        Manage My Foods
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/my-food-request"
                        className={({ isActive }) =>
                          isActive ? "text-blue-500" : ""
                        }
                      >
                        My Food Request
                      </NavLink>
                    </li>
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
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/available-foods"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Available Foods
                </NavLink>
              </li>
              {user?.email && (
                <>
                  <li>
                    <NavLink
                      to="/add-food"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Add Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/be-premium"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Be Premium
                    </NavLink>
                  </li>
                </>
              )}
              {user?.email && (
                <li tabIndex={0}>
                  <details>
                    <summary className="">Dashboard</summary>
                    <ul className="p-2 menu menu-sm dropdown-content z-[1] w-[170px]">
                      <li>
                        <NavLink
                          to="/manage-my-foods"
                          className={({ isActive }) =>
                            isActive ? "text-blue-500" : ""
                          }
                        >
                          Manage My Foods
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/my-food-request"
                          className={({ isActive }) =>
                            isActive ? "text-blue-500" : ""
                          }
                        >
                          My Food Request
                        </NavLink>
                      </li>
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
                  className="w-9 rounded-full mr-2"
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
                    <NavLink
                      to="/my-profile"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      View Profile
                    </NavLink>
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
