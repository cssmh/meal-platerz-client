import { useLoaderData } from "react-router-dom";
import MyPendingCard from "../MyPendingCard/MyPendingCard";

const MyPending = () => {
  const loadRequestedData = useLoaderData();

  return (
    <div>
      {loadRequestedData.length === 0 ? (
        <p className="text-center my-4 text-redFood text-xl italic">
          No one Requested fot This Food
        </p>
      ) : (
        <div className="mb-8">
          <p className="text-center my-4 text-blue-900 text-xl italic">
            User Requested for This Food
          </p>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {loadRequestedData.map((req) => (
              <MyPendingCard key={req._id} getReq={req}></MyPendingCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPending;
