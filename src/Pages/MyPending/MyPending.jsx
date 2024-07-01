import { useParams } from "react-router-dom";
import MyPendingCard from "../MyPendingCard/MyPendingCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { getMyPending, unavailableId } from "../../api/Foods";

const MyPending = () => {
  const { loading, user } = useAuth();
  const { id } = useParams();

  const { data: requestedData, refetch: refetchReq } = useQuery({
    queryKey: ["myPending", id],
    queryFn: async () => {
      return await getMyPending(id);
    },
  });

  const { data: unavailableIds = [] } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["unavailableIds", user?.email],
    queryFn: async () => {
      const data = await unavailableId(user?.email);
      return data?.map((food) => food._id);
    },
  });

  return (
    <div>
      {requestedData?.length === 0 ? (
        <p className="text-center my-[10px] text-redFood text-xl italic">
          No one Requested fot This Food
        </p>
      ) : (
        <div className="mb-8">
          <p className="text-center my-[10px] text-blue-900 text-xl italic">
            User Requested for This Food
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {requestedData?.map((req) => (
              <MyPendingCard
                key={req._id}
                getReq={req}
                unavailableIds={unavailableIds}
                refetchReq={refetchReq}
              ></MyPendingCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPending;
