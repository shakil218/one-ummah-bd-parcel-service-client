import React from "react";
import authImage from "../assets/authImage.png";
import { Link, Outlet } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import OneUmmahLogo from "../Pages/Shared/OneUmmahLogo/OneUmmahLogo";

const AuthLayouts = () => {
  return (
    <div className="max-w-11/12 mx-auto flex flex-col md:flex-row py-5 min-h-[calc(100vh-40px)]">
      {/* LEFT SIDE (Form area with logo and outlet) */}
      <div
        className="flex-1 flex flex-col justify-between bg-base-100 p-8"
        
      >
        {/* TOP: Logo */}
        <div className="w-full flex justify-center md:justify-start">
          <Link to="/" className="flex items-center gap-2">
            <OneUmmahLogo></OneUmmahLogo>
          </Link>
        </div>

        {/* CENTER: Auth content (Outlet) */}
        <motion.div initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }} className="flex flex-1 items-center justify-center">
          <Outlet />
        </motion.div>
      </div>

      {/* RIGHT SIDE (Image cover) */}
      <div className="flex-1 hidden md:flex items-center justify-center bg-[#FAFDF0]">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={authImage} alt="Auth Image" />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayouts;
