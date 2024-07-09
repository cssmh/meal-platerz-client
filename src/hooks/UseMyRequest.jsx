import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getMyRequests } from "../api/Foods";

const useMyRequest = () => {
  const { loading, user } = useAuth();
  const {
    data: myFoodRequest = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myFoodRequest", user?.email],
    queryFn: async () => {
      return await getMyRequests(user?.email);
    },
    enabled: !loading && !!user?.email,
  });
  return { isLoading, myFoodRequest, refetch, user };
};

export default useMyRequest;
