import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Root from "./Root/Root";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./AuthProviders/AuthProviders";
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
{
  /* <div className="mt-5 text-center">
  <button className="text-white bg-cyan-600 px-3 py-[6px] rounded-lg">
    Delete all Requested Foods
  </button>
</div>; */
}
