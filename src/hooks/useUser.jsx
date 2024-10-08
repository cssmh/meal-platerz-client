import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "../api/users";

const useUser = () => {
  const { user, loading } = useAuth();
  const {
    refetch,
    data: userData = {},
    isLoading,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["user"],
    queryFn: async () => {
      return await getSingleUser(user?.email);
    },
  });

  return { userData, refetch, isLoading };
};

export default useUser;
