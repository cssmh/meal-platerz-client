import { useParams } from "react-router-dom";
import UserReqCard from "./UserReqCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { getUserReq, unavailableId } from "../api/Foods";
import SmallLoader from "../Component/SmallLoader";
import PlaterHelmet from "../Component/PlaterHelmet";

const UserReq = () => {
  const { loading, user } = useAuth();
  const { id, email } = useParams();

  const {
    isLoading,
    data: requestedData,
    refetch: refetchReq,
  } = useQuery({
    queryKey: ["userRequest", id, email],
    queryFn: async () => {
      return await getUserReq(id, email);
    },
  });

  const {
    isLoading: idLoading,
    data: unavailableIds = [],
    refetch: idFetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["unavailableIds", user?.email],
    queryFn: async () => {
      const data = await unavailableId(user?.email);
      return data?.map((food) => food?._id);
    },
  });

  if (loading || isLoading || idLoading) return <SmallLoader />;

  return (
    <div>
      <PlaterHelmet title={"User Request"} />
      {requestedData?.length === 0 ? (
        <p className="text-center my-[10px] text-[#f01543] text-xl italic">
          No one Requested for This Food
        </p>
      ) : (
        <div className="mb-8">
          <p className="text-center my-[10px] text-blue-900 text-xl italic">
            User Requested for This Food
          </p>
          <div className="max-w-7xl 2xl:max-w-[92%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {requestedData?.map((req) => (
              <UserReqCard
                key={req._id}
                getReq={req}
                unavailableIds={unavailableIds}
                refetchReq={refetchReq}
                idFetch={idFetch}
              ></UserReqCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReq;
