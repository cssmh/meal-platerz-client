import { useState, useEffect } from "react";
import moment from "moment";
import useUser from "./useUser";

const useExpired = () => {
  const { userData, isLoading } = useUser();
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let interval;
    const checkExpiration = () => {
      if (!isLoading) {
        if (userData?.premium_date) {
          const premiumDate = moment(parseInt(userData.premium_date, 10));
          const now = moment();
          setIsExpired(premiumDate.isBefore(now, "second"));
        } else {
          setIsExpired(true);
        }
      }
    };

    if (!isLoading) {
      checkExpiration();
      interval = setInterval(checkExpiration, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [userData, isLoading]);

  return isExpired;
};

export default useExpired;
