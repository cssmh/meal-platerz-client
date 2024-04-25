import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/meal.jpg";
import useContextHook from "../../useCustomHook/useContextHook";

const Navbar = () => {
  const { user, logOut } = useContextHook();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogOut = () => {
    logOut().then().catch();
  };

  return (
    <div className="border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm btn-ghost lg:hidden"
            >
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/available-foods"}
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
                      to={"/add-food"}
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Add Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/manage-my-foods"}
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Manage My Foods
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/my-food-request"}
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
          <img src={logo} className="w-11 mr-1" />
          <a className="font-semibold text-xl px-0">MealPlaterz</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/available-foods"}
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
              >
                Available Foods
              </NavLink>
            </li>
            {user?.email && (
              <li>
                <NavLink
                  to={"/add-food"}
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : ""
                  }
                >
                  Add Food
                </NavLink>
              </li>
            )}
            {user?.email && (
              <li tabIndex={0}>
                <details>
                  <summary className="">Dashboard</summary>
                  <ul className="p-2 menu menu-sm dropdown-content z-[1] w-[170px]">
                    <li>
                      <NavLink
                        to={"/manage-my-foods"}
                        className={({ isActive }) =>
                          isActive ? "text-blue-500" : ""
                        }
                      >
                        Manage My Foods
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/my-food-request"}
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
          {user?.email && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} onClick={handleProfileClick}>
                <img src={user?.photoURL} className="w-10 rounded-full mr-2" />
              </label>
              {showProfileOptions && (
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
                      to={"/my-profile"}
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
          )}
          {user?.email ? (
            <button
              onClick={handleLogOut}
              className="bg-redFood rounded-md text-white py-1 px-[10px]"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <p className="bg-redFood rounded-md text-white py-1 px-[10px]">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
