import moment from "moment";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const Countdown = ({ profile = false }) => {
  const { userData, isLoading } = useUser();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!userData || !userData.premium_date) return;

    const targetDate = moment(userData.premium_date).toDate();

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        setIsExpired(true);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
        });
        setIsExpired(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isExpired ? (
        <p>Your premium membership has expired.</p>
      ) : (
        <div className="flex gap-3">
          <div>
            <span
              className={`countdown font-medium ${
                profile ? "text-4xl" : "text-xl"
              }`}
            >
              <span style={{ "--value": countdown.days }}></span>
            </span>
            days
          </div>
          <div>
            <span
              className={`countdown font-medium ${
                profile ? "text-4xl" : "text-xl"
              }`}
            >
              <span style={{ "--value": countdown.hours }}></span>
            </span>
            hours
          </div>
          <div>
            <span
              className={`countdown font-medium ${
                profile ? "text-4xl" : "text-xl"
              }`}
            >
              <span style={{ "--value": countdown.minutes }}></span>
            </span>
            min
          </div>
          <div>
            <span
              className={`countdown font-medium ${
                profile ? "text-4xl" : "text-xl"
              }`}
            >
              <span style={{ "--value": countdown.seconds }}></span>
            </span>
            sec
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
