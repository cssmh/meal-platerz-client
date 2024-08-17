import { useState, useEffect } from "react";
import moment from "moment";
import useUser from "./useUser";

const useIsPremium = () => {
  const { userData, isLoading } = useUser();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let interval;
    const checkExpiration = () => {
      if (!isLoading) {
        if (userData?.premium_date) {
          const premiumDate = moment(parseInt(userData.premium_date, 10));
          const now = moment();
          // If the premium date is after now, the user is still premium
          setIsPremium(premiumDate.isAfter(now, "second"));
        } else {
          // If there's no premium_date, consider the user as not premium
          setIsPremium(false);
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

  return isPremium;
};

export default useIsPremium;
