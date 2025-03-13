import { getFood } from "../api/Foods";
import { useQuery } from "@tanstack/react-query";

const useFood = (id) => {
  const {
    data: food = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["food", id],
    queryFn: () => getFood(id),
  });

  return { isLoading, food, refetch };
};
export default useFood;
