import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const BePremium = () => {
  const initialTime = 15 * 24 * 3600; // 15 days in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return initialTime; // Reset to 15 days when the countdown ends
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [initialTime]);

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 md:p-8 md:rounded-md shadow-lg flex flex-col md:flex-row items-center justify-between mb-12">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <FaStar className="text-yellow-400 text-4xl" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Go Premium!</h2>
          <p className="text-sm md:text-lg">
            Unlock exclusive features and content.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-5 text-center">
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                <span style={{ "--value": days }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                <span style={{ "--value": hours }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                <span style={{ "--value": minutes }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-3xl">
                <span style={{ "--value": seconds }}></span>
              </span>
              sec
            </div>
          </div>
          <p className="text-sm md:text-base text-yellow-200">
            Catch free food delivery offer in time!
          </p>
        </div>
        <Link
          to="/be-premium"
          className="bg-yellow-400 animate-pulse text-indigo-600 px-6 py-2 md:py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition duration-300 ease-in-out"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default BePremium;
