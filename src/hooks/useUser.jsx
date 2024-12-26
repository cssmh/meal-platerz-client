import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "../api/users";

const useUser = () => {
  const { user, loading } = useAuth();
  const {
    refetch,
    data: userData = {},
    isLoading: load,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["singleUser"],
    queryFn: async () => {
      if (user?.email) {
        return await getSingleUser(user?.email);
      }
      return {};
    },
  });
  const isLoading = loading || load;
  return { userData, refetch, isLoading };
};

export default useUser;
