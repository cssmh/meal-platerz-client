import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "../api/users";

const useUser = () => {
  const { user, loading } = useAuth();
  const {
    data: userData = {},
    isLoading: load,
    refetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["singleUser", user?.email],
    queryFn: async () => await getSingleUser(user?.email),
  });

  const isLoading = loading || load;

  return { userData, refetch, isLoading };
};

export default useUser;
