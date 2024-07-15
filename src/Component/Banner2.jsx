import { Link } from "react-router-dom";
import BannerImg from "../assets/food-banner.jpg";

const Banner2 = () => {
  return (
    <div>
      <div
        className="relative flex items-center justify-center min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${BannerImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl text-center text-white px-4 md:px-6 py-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Building Communities by Sharing Excess Food Resources
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Our mission is simple yet profound: to build resilient communities
            by fostering the sharing of excess food resources. We believe that
            in a world where millions go hungry while tons of food are wasted,
            there is an urgent need for collective action.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/foods"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Foods
            </Link>
            <Link
              to="/blogs"
              className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Blogs
            </Link>
            <Link
              to="/all-reviews"
              className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
