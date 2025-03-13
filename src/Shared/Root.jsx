import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import ErrorPage from "../Component/ErrorPage";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import AvailableFoods from "../Pages/AvailableFoods";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Component/MyProfile";
import Payment from "../Pages/Payment";
import AddFood from "../Pages/AddFood";
import MyFoods from "../Pages/MyFoods";
import MyRequest from "../Pages/MyRequest";
import FoodDetails from "../Pages/FoodDetails";
import UserReq from "../Pages/UserReq";
import Blogs from "../Component/Blogs";
import AllReviews from "../Component/AllReviews";
import UserAnalytics from "../Pages/UserAnalytics";
const Root = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/available-foods", element: <AvailableFoods /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/all-reviews", element: <AllReviews /> },
      { path: "/user-analytics", element: <UserAnalytics /> },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      { path: "/be-premium", element: <Payment /> },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <PrivateRoute>
            <MyRequest />
          </PrivateRoute>
        ),
      },
      { path: "/food/:id", element: <FoodDetails /> },
      {
        path: "/req-for/:id/:email",
        element: (
          <PrivateRoute>
            <UserReq />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Root;
