import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const BePremium = () => {
  return (
    <div className="relative -top-[30px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-md shadow-lg flex flex-col md:flex-row items-center justify-between my-7">
      <div className="flex items-center space-x-4">
        <FaStar className="text-yellow-400 text-4xl animate-pulse" />
        <div>
          <h2 className="text-3xl font-bold">Go Premium!</h2>
          <p className="text-lg">Unlock exclusive features and content.</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0">
        <Link
          to="/be-premium"
          className="bg-yellow-400 text-indigo-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition duration-300 ease-in-out"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default BePremium;
