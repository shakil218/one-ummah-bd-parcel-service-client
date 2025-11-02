import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { router } from "./Router/Router.jsx";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import Spinner from "./Pages/Shared/Spinner/Spinner.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-base-200 font-urbanist">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider
            router={router}
            hydrateFallbackElement={<Spinner />}
          />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
