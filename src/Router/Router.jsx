import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import CoverageArea from "../Pages/Coverage/CoverageArea";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        element: (
          <PrivateRoute>
            <CoverageArea></CoverageArea>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
    ],
  },
]);
