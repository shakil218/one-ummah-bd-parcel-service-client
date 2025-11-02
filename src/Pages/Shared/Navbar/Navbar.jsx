import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import OneUmmahLogo from "../OneUmmahLogo/OneUmmahLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary pb-1 transition"
      : "text-gray-600 hover:text-primary transition";

  const navItems = (
    <>
      <li>
        <NavLink to={"/"} className={linkClasses}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/about"} className={linkClasses}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to={"/sendParcel"} className={linkClasses}>
          Send A Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"} className={linkClasses}>
          Coverage Area
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/dashboard"} className={linkClasses}>
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/contact"} className={linkClasses}>
          Contact
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar bg-base-100 z-50 relative shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {/* {navItems} */}

            {navItems}
          </ul>
        </div>
        <Link className="">
          <OneUmmahLogo></OneUmmahLogo>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        <div onClick={handleSignOut}>
          {user && user?.email ? (
            <Link className="btn bg-primary">Log Out</Link>
          ) : (
            <Link className="btn bg-primary">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
