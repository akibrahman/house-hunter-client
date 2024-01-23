import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddAHousePage from "./Pages/AddAHousePage";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import AuthProvider from "./Providers/AuthProvider";
import Root from "./Root";
import UserRoute from "./Routes/UserRoute";
import "./index.css";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/dashboard",
    element: (
      <UserRoute>
        <DashboardPage />
      </UserRoute>
    ),
  },
  {
    path: "/add-a-house",
    element: (
      <UserRoute>
        <AddAHousePage />
      </UserRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
