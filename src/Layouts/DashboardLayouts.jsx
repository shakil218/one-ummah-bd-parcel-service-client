import React from "react";
import OneUmmahLogo from "../Pages/Shared/OneUmmahLogo/OneUmmahLogo";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayouts = () => {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary pb-1 transition"
      : "text-gray-600 hover:text-primary transition";


  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <OneUmmahLogo></OneUmmahLogo>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 min-h-full w-80 p-4">
          <Link to={"/"}><OneUmmahLogo></OneUmmahLogo></Link>
          {/* Sidebar content here */}
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/my-parcels'} className={navLinkClasses}>My Parcels</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
