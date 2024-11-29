import React from "react";
import instagram from "../assest/logo/instagram.png";
import meta from "../assest/logo/meta.png";
import twitter from "../assest/logo/twitter.png";
import whatsapp from "../assest/logo/whatsapp.png";
import mainlogo from "../assest/logo/LogoInvert.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();
  return (
    <div>
      <footer className="bg-textColor-light py-6 px-14 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="pl-6 md:pl-0">
          <img className="w-52" src={mainlogo} alt="mainlogo" />
          <div className="flex ml-12 mt-6 gap-4">
            <img className="w-8 h-8" src={meta} alt="meta" />
            <img className="w-6 h-6" src={twitter} alt="twitter" />
            <img className="w-7 h-7" src={instagram} alt="instagram" />
          </div>
          <p className="text-white mt-16 ml-20 text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45">
            About Us
          </p>
          <p className="text-white ml-[84px] text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45">
            Support
          </p>
        </div>
        <div className="text-center">
          <p className="mb-3 text-white text-base sm:text-xl">
            Zenglow Beauty Store
          </p>
          <p className="text-white text-xs sm:text-base opacity-45">
            2nd Floor, Orchid Plaza
          </p>
          <p className="text-white text-xs sm:text-base opacity-45">
            M.G. Road, Thrissur
          </p>
          <p className="text-white text-xs sm:text-base opacity-45">
            Thrissur District
          </p>
          <p className="text-white text-xs sm:text-base opacity-45">
            Kerala - 680001
          </p>
          <p className="text-white text-xs sm:text-base opacity-45">India</p>
          <p className="text-white text-xs sm:text-base my-4">
            Contact: +91 98765 43210
          </p>
          <p className="text-white text-xs sm:text-base ">
            Email:{" "}
            <a className="hover:text-blue-400 hover:underline cursor-pointer">
              support@zenglow.in
            </a>
          </p>
        </div>
        <div className="text-center m-6">
          <p className="mb-3 text-white text-xl sm:text-3xl">Products</p>
          <p
            onClick={() => {
              nav("/product-category/SkinCare");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            SkinCare
          </p>
          <p
            onClick={() => {
              nav("/product-category/Makeup");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            MakeUp
          </p>
          <p
            onClick={() => {
              nav("/product-category/Haircare");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            HairCare
          </p>
        </div>
        <div className="text-center m-6">
          <p className="mb-3 text-white text-xl sm:text-3xl">Pages</p>
          <p
            onClick={() => {
              nav("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            Home
          </p>
          <p
            onClick={() => {
              nav("/cart");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            Cart
          </p>
          <p
            onClick={() => {
              nav("/wishlist");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            Wishlist
          </p>
          <p
            onClick={() => {
              nav("/profile");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            Profile
          </p>
          <p
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-white text-xs sm:text-base hover:opacity-100 cursor-pointer my-4 opacity-45"
          >
            Go to Top
          </p>
        </div>
      </footer>
      <div className="bg-black w-full py-6 h-18 text-center text-white">
        Copyright © 2024-2026, Zenglow. All Rights Reserved
      </div>
    </div>
  );
}
