import { useState, useEffect } from "react";
import useUser from "./useUser";

const useIsPremium = () => {
  const { userData, isLoading } = useUser();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (isLoading || !userData) return; // Wait until user data is available

    // Check if the premium date is valid and not expired
    const checkExpiration = () => {
      if (userData?.premium_date) {
        const premiumDate = new Date(parseInt(userData.premium_date, 10)); // Convert premium_date to Date
        const now = new Date(); // Current date
        setIsPremium(premiumDate > now); // true if premiumDate is in the future
      } else {
        setIsPremium(false); // Default to false if no premium_date is provided
      }
    };

    checkExpiration(); // Run the expiration check on load
  }, [userData, isLoading]);

  return isPremium;
};

export default useIsPremium;
