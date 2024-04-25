import { useLoaderData } from "react-router-dom";
import ManageMyRequestCard from "../ManageMyRequestCard/ManageMyRequestCard";

const ManageMyRequest = () => {
  const loadRequestedData = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
      {loadRequestedData.map((req) => (
        <ManageMyRequestCard key={req._id} getReq={req}></ManageMyRequestCard>
      ))}
    </div>
  );
};

export default ManageMyRequest;
