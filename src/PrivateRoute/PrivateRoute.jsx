import { Navigate, useLocation } from "react-router-dom";
import useContextHook from "../useCustomHook/useContextHook";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContextHook();
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <p>Loading</p>;
  }

  if (!loading && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
