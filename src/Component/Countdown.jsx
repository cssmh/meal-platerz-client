import React, { useEffect, useState } from "react";
import moment from "moment";
import useUser from "../hooks/useUser";

const Countdown = () => {
  const { userData, isLoading } = useUser();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!userData || !userData.premium_date) return;

    const targetDate = moment(userData.premium_date).toDate();

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      // Calculate the time left
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
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <p>
      {countdown.days} days {countdown.hours} hours {countdown.minutes} minutes{" "}
      {countdown.seconds} seconds
    </p>
  );
};

export default Countdown;
