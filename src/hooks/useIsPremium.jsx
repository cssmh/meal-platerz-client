import moment from "moment";
import { useState, useEffect } from "react";
import useUser from "./useUser";

const useIsPremium = () => {
  const { userData, isLoading, refetch } = useUser();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let interval;
    const checkExpiration = () => {
      if (!isLoading) {
        if (userData?.premium_date) {
          const premiumDate = moment(parseInt(userData.premium_date, 10));
          const now = moment();
          setIsPremium(premiumDate.isAfter(now, "second"));
        } else {
          setIsPremium(false);
          refetch();
        }
      } else {
        setIsPremium(false);
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
  }, [userData, isLoading, refetch]);

  return isPremium;
};

export default useIsPremium;
