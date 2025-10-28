import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import CoverageArea from "../Pages/Coverage/CoverageArea";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'coverage',
        Component:() => (
          <PrivateRoute>
            <CoverageArea/>
          </PrivateRoute>
        ),
        loader: ()=>fetch("../../public/warehouses.json")
      }
    ]
  },
  {
    path:"/",
    Component:AuthLayouts,
    children:[
      {
        path:"login",
        Component:Login
      },
      {
        path:"register",
        Component:Register
      }
    ]
  }
]);