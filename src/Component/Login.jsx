import { useState } from "react";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { addUser } from "../api/users";
import { PiSpinnerGapLight } from "react-icons/pi";
import PlaterHelmet from "./PlaterHelmet";

const Login = () => {
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await login(email, password);
      toast.success("Logged in successfully");
      navigateTo(location?.state || "/");
      const userData = {
        email: email.toLowerCase(),
        name: res?.user?.displayName,
      };
      await addUser(userData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      toast.success("User logged in successfully");
      navigateTo(location?.state || "/");
      const userData = {
        email: res?.user?.email.toLowerCase(),
        name: res?.user?.displayName,
      };
      await addUser(userData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="my-8 space-y-3 rounded-xl lg:w-1/2 mx-2 md:mx-auto">
      <PlaterHelmet title={"Login"} />
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm relative">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[36px] right-3 cursor-pointer"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-xl dark:text-gray-50 dark:bg-redFood">
          {loading ? (
            <div className="flex justify-center">
              <PiSpinnerGapLight className="animate-spin text-xl my-[2px]" />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleGoogleLogin}
          aria-label="Log in with Google"
          className="px-6 py-2 rounded-xl bg-redFood text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Do not have an account?{" "}
        <Link
          state={location.state}
          to={"/register"}
          rel="noopener noreferrer"
          className="underline dark:text-redFood"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
