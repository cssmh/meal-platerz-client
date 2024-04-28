import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Component/Home/Home";
import ErrorPage from "../Component/ErrorPage/ErrorPage";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import AvailableFoods from "../Pages/AvailableFoods/AvailableFoods";
import MyProfile from "../Component/MyProfile/MyProfile";
import MyFoodRequest from "../Pages/MyFoodRequest/MyFoodRequest";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddFood from "../Pages/AddFood/AddFood";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import MyFoods from "../Pages/MyFoods/MyFoods";
import MyPending from "../Pages/MyPending/MyPending";
const Root = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
            <MyFoodRequest />
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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/food/${params.id}`),
      },
      {
        path: "/manage/:id",
        element: (
          <PrivateRoute>
            <MyPending />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/pending-request/${params.id}`),
      },
    ],
  },
]);

export default Root;
