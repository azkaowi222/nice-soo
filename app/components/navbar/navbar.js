/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Tag, LogIn } from "react-feather";
import Image from "next/image";
import Navbox from "./nav-box/Navbox";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <Navbox>
      <div className="hidden md:block">
        <a href="/" className="logo flex items-center">
          <Image
            className="md:w-20 w-18 aspect-square object-cover cursor-pointer md:block"
            src={"/images/niceso-tp.png"}
            priority={true}
            alt="logo"
            width={100}
            height={50}
          />
          <h3 className="text-2xl font-semibold custom-font md:block">
            Nice So
          </h3>
        </a>
      </div>
      <ul className="nav-links flex md:gap-10 gap-3 w-full md:w-auto justify-around">
        <li className="flex items-center">
          <a
            href="/"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center   ${
              pathname === "/" ? "text-red-500" : "text-black"
            }`}
          >
            <Home className="mr-2 w-4 md:w-5" />
            Beranda
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="/cart"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
              pathname === "/cart" ? "text-red-500" : "text-black"
            }`}
          >
            <ShoppingCart className="mr-2 w-4 md:w-5" />
            Keranjang
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="/promo"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
              pathname === "/promo" ? "text-red-500" : "text-black"
            }`}
          >
            <Tag className="mr-2 w-4 md:w-5" />
            Promo
          </a>
        </li>
        <li className="flex items-center">
          <a
            href="/login"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
              pathname === "/login" ? "text-red-500" : "text-black"
            }`}
          >
            <LogIn className="mr-2 w-4 md:w-5" />
            Masuk
          </a>
        </li>
      </ul>
    </Navbox>
  );
};

export default Navbar;
