import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import OneUmmahLogo from "../OneUmmahLogo/OneUmmahLogo";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // const navItems = (
  //   <>
  //     <li>
  //       <NavLink to={"/"}>Home</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/about"}>About Us</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/coverage"}>Coverage Area</NavLink>
  //     </li>
  //     <li>
  //       <NavLink to={"/contact"}>Contact</NavLink>
  //     </li>
  //   </>
  // );
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Coverage Area", path: "/coverage" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSignOut = () => {
    logOut()
      .then(() => {
        // alert("User successfully sign out")
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
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
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold border-b-2 border-primary pb-1 transition"
                      : "text-gray-600 hover:text-primary transition"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <OneUmmahLogo></OneUmmahLogo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary pb-1 transition"
                    : "text-gray-600 hover:text-[#7ea906] transition"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
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
