import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { checkAdmin } from "../api/users";

const useIsAdmin = () => {
  const { loading, user } = useAuth();
  const { data = {} } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => await checkAdmin(user?.email),
    enabled: !loading && !!user?.email,
  });
  const isAdmin = data?.role === "admin";
  return { isAdmin };
};

export default useIsAdmin;
