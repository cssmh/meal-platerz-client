import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="border-b">
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
              <NavLink
                to={"/"}
                className={({ isActive }) => isActive && "text-blue-500"}
              >
                <li>
                  <a>Home</a>
                </li>
              </NavLink>
              <NavLink
                to={"/available-foods"}
                className={({ isActive }) => isActive && "text-blue-500"}
              >
                <li>
                  <a>Available Foods</a>
                </li>
              </NavLink>
              <NavLink
                to={"/add-food"}
                className={({ isActive }) => isActive && "text-blue-500"}
              >
                <li>
                  <a>Add Food</a>
                </li>
              </NavLink>
              <NavLink
                to={"/my-foods"}
                className={({ isActive }) => isActive && "text-blue-500"}
              >
                <li>
                  <a>My Added Foods</a>
                </li>
              </NavLink>
              <NavLink
                to={"/my-food-request"}
                className={({ isActive }) => isActive && "text-blue-500"}
              >
                <li>
                  <a>My Food Request</a>
                </li>
              </NavLink>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl px-0">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink
              to={"/"}
              className={({ isActive }) => isActive && "text-blue-500"}
            >
              <li>
                <a>Home</a>
              </li>
            </NavLink>
            <NavLink
              to={"/available-foods"}
              className={({ isActive }) => isActive && "text-blue-500"}
            >
              <li>
                <a>Available Foods</a>
              </li>
            </NavLink>
            <NavLink
              to={"/add-food"}
              className={({ isActive }) => isActive && "text-blue-500"}
            >
              <li>
                <a>Add Food</a>
              </li>
            </NavLink>
            <li tabIndex={0}>
              <details>
                <summary className="">Dashboard</summary>
                <ul className="p-2 menu menu-sm dropdown-content z-[1] w-40">
                  <NavLink
                    to={"/my-foods"}
                    className={({ isActive }) => isActive && "text-blue-500"}
                  >
                    <li>
                      <a>My Added Foods</a>
                    </li>
                  </NavLink>
                  <NavLink
                    to={"/my-food-request"}
                    className={({ isActive }) => isActive && "text-blue-500"}
                  >
                    <li>
                      <a>My Food Request</a>
                    </li>
                  </NavLink>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to={"/login"}>
            <p className="bg-blue-500 text-white py-1 px-[10px]">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
