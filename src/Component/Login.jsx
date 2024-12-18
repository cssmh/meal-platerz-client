import { useState } from "react";
import { toast } from "sonner";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
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
      toast.success("Log in successfully");
      navigateTo(location?.state || "/");
      const userData = {
        email: res.user?.email.toLowerCase(),
        name: res.user?.displayName || "anonymous",
      };
      await addUser(userData);
    } catch (err) {
      console.log("Add user error", err.response.data.message);
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
        email: res.user?.email.toLowerCase(),
        name: res.user?.displayName || "anonymous",
      };
      await addUser(userData);
    } catch (err) {
      console.log("Add user error", err.response.data.message);
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
        <button className="block w-full p-3 text-center rounded-xl dark:text-gray-50 dark:bg-[#f01543]">
          {loading ? (
            <div className="flex justify-center">
              <PiSpinnerGapLight className="animate-spin text-xl my-[2px]" />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="flex items-center py-2 space-x-1">
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
          className="flex items-center gap-1 px-6 py-2 rounded-xl bg-[#f01543] text-white"
        >
          <FaGoogle className="text-xl" /> <span>Google login</span>
        </button>
      </div>
      <p className="text-sm text-center text-gray-600 pt-1">
        Do not have an account?{" "}
        <Link
          state={location.state}
          to={"/register"}
          rel="noopener noreferrer"
          className="underline dark:text-[#f01543]"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
