import { useState, useEffect } from "react";
import useUser from "./useUser";

const useIsPremium = () => {
  const { userData, isLoading, refetch } = useUser();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let interval;

    const checkExpiration = () => {
      if (!isLoading && userData?.premium_date) {
        const premiumDate = new Date(parseInt(userData.premium_date, 10));
        const now = new Date();
        setIsPremium(premiumDate > now);
      } else {
        setIsPremium(false);
        refetch();
      }
    };

    if (userData) {
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
