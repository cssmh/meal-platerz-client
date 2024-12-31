import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPremiumTimer } from "../api/users";

const BePremium = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { data = {} } = useQuery({
    queryKey: ["timers"],
    queryFn: async () => await getPremiumTimer(),
  });

  useEffect(() => {
    if (data?.endTime) {
      const serverEndTime = parseInt(data.endTime, 10);
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime < serverEndTime) {
        setTimeLeft(serverEndTime - currentTime);
      } else {
        setTimeLeft(0);
      }

      const timer = setInterval(() => {
        const updatedTimeLeft = serverEndTime - Math.floor(Date.now() / 1000);
        if (updatedTimeLeft > 0) {
          setTimeLeft(updatedTimeLeft);
        } else {
          clearInterval(timer);
          setTimeLeft(0);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data?.endTime]);

  const days = Math.floor(timeLeft / (24 * 3600));
  const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 md:p-8 md:rounded-md shadow-lg flex flex-col md:flex-row items-center justify-between mb-12">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <FaStar className="text-yellow-400 text-4xl" />
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Go Premium!</h2>
          <p className="text-sm md:text-lg">
            Unlock exclusive features and content.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-3xl">{days}</span>
              days 
            </div>
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-3xl">{hours}</span>
              hours
            </div>
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-3xl">{minutes}</span>
              min
            </div>
            <div className="flex flex-col items-center">
              <span className="countdown font-mono text-3xl">{seconds}</span>
              sec
            </div>
          </div>
          <p className="text-sm md:text-base">
            Catch free food delivery offer in time!
          </p>
        </div>
        <Link
          to="/be-premium"
          className="bg-yellow-400 animate-pulse text-indigo-600 px-5 py-2 rounded-full text-lg font-semibold hover:bg-yellow-300 transition duration-300 ease-in-out"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default BePremium;
