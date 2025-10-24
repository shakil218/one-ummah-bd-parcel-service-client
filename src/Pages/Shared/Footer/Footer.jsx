import React from "react";
import { Link } from "react-router";
import linkedIn from "../../../assets/footer/linkedin-footer-icon.png"
import twitter from "../../../assets/footer/twitter-footer-logo.png"
import facebook from "../../../assets/footer/facebook-footer-logo.png"
import youtube from "../../../assets/footer/youtube-footer-logo.png"
import OneUmmahLogo from "../OneUmmahLogo/OneUmmahLogo";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] rounded-xl md:rounded-2xl lg:rounded-4xl text-primary-content p-10">
      <aside>
        <OneUmmahLogo></OneUmmahLogo>
        <p className="font-bold mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br className="hidden lg:block" /> business shipments — we deliver on
          time, every time.
        </p>
        <div className="grid grid-cols-4  md:flex gap-2 md:gap-6 mt-5 text-center">
          <Link to={'#'}>Services</Link>
          <Link to={'#'}>Coverage</Link>
          <Link to={'#'}>About Us</Link>
          <Link to={'#'}>Pricing</Link>
          <Link to={'#'}>Blog</Link>
          <Link to={'#'}>Contact</Link>
        </div>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-6">
          <Link><img src={linkedIn} alt="" /></Link>
          <Link><img src={twitter} alt="" /></Link>
          <Link><img src={facebook} alt="" /></Link>
          <Link><img src={youtube} alt="" /></Link>
          
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
