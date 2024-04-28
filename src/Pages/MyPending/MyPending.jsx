import { useLoaderData } from "react-router-dom";
import MyPendingCard from "../MyPendingCard/MyPendingCard";

const MyPending = () => {
  const loadRequestedData = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
      {loadRequestedData.map((req) => (
        <MyPendingCard key={req._id} getReq={req}></MyPendingCard>
      ))}
    </div>
  );
};

export default MyPending;
