import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import Root from "./Root/Root";
import { Toaster } from "react-hot-toast";
import AuthProviders from "./AuthProviders/AuthProviders";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={Root} />
      </AuthProviders>
    </HelmetProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);

// console.log(Object.keys(getFoods).join(","));
