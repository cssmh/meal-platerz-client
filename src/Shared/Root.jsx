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
import { getFood } from "../api/Foods";
import MyPending from "../Pages/MyPending";
import Blogs from "../Component/Blogs";
import AllReviews from "../Component/AllReviews";
const Root = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/be-premium",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
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
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => await getFood(params.id),
      },
      {
        path: "/req-for/:id/:email",
        element: (
          <PrivateRoute>
            <MyPending />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: (
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-reviews",
        element: (
          <PrivateRoute>
            <AllReviews />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Root;
