import { useEffect, useState } from "react";
import { FiWifi, FiWifiOff } from "react-icons/fi";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Internet = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);
  const axiosNoToken = useAxiosPublic();

  const { isLoading, data } = useQuery({
    queryKey: ["internet", navigator.onLine],
    queryFn: async () => {
      const res = await axiosNoToken.get("/");
      return res?.data;
    },
  });
  console.log(data);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className="z-10 fixed -bottom-2 left-0 p-5">
      {showMessage &&
        (isOnline ? (
          <>
            {!isLoading && data === "BOOKS ARE YOURS" && (
              <p className="flex items-center gap-1 text-green-400">
                <FiWifi />
                Your internet connection is restored
              </p>
            )}
          </>
        ) : (
          <>
            <p className="flex items-center gap-1 text-red-600">
              <FiWifiOff />
              <p>You lost the internet connection</p>
            </p>
          </>
        ))}
    </div>
  );
};

export default Internet;
