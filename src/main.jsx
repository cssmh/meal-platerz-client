import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./Shared/Root";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./Shared/AuthProviders";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <RouterProvider router={Root} />
        </AuthProviders>
      </QueryClientProvider>
    </HelmetProvider>
    <Toaster position="bottom-center" reverseOrder={false} />
  </React.StrictMode>
);

// console.log(Object.keys(getFoods).join(","));
