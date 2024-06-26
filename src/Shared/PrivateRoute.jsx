import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { DotLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <DotLoader color="#36d7b7" />
        <p className="text-white">Loading..</p>
      </div>
    );
  }

  if (user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
