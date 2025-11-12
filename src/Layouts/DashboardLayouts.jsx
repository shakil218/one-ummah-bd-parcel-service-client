import React from "react";
import OneUmmahLogo from "../Pages/Shared/OneUmmahLogo/OneUmmahLogo";
import { Link, NavLink, Outlet } from "react-router";
import { FaBox, FaHome, FaMoneyCheckAlt, FaSearchLocation, FaUserEdit } from "react-icons/fa";

const DashboardLayouts = () => {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-secondary font-semibold border-b-2 border-secondary pb-1 transition"
      : "text-gray-600 hover:text-primary transition";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-200 w-full lg:hidden">
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
            <Link to={"/"}>
              <OneUmmahLogo></OneUmmahLogo>
            </Link>
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
          <Link to={"/"}>
            <OneUmmahLogo></OneUmmahLogo>
          </Link>
          {/* Sidebar content here */}
          <li>
            <NavLink to={'/'} className={navLinkClasses}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-parcels" className={navLinkClasses}>
              <FaBox /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/payment-history" className={navLinkClasses}>
              <FaMoneyCheckAlt /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tracking" className={navLinkClasses}>
              <FaSearchLocation /> Tracking Parcel
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/update-profile" className={navLinkClasses}>
              <FaUserEdit /> Update Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayouts;
