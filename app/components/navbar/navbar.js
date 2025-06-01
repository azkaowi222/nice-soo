"use client";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Tag, LogIn, User } from "react-feather";
import Image from "next/image";
import Navbox from "./nav-box/Navbox";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Cek ulang token setiap kali route berubah
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [pathname]); // ini penting!

  if (!hasMounted) return null;

  return (
    <Navbox>
      <div className="hidden md:block">
        <Link href="/" className="logo flex items-center">
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
        </Link>
      </div>

      <ul className="nav-links flex md:gap-10 gap-3 w-full md:w-auto justify-around">
        <li className="flex items-center">
          <Link
            href="/"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
              pathname === "/" ? "text-red-500" : "text-black"
            }`}
          >
            <Home className="mr-2 w-4 md:w-5" />
            Beranda
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            href="/cart"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
              pathname === "/cart" ? "text-red-500" : "text-black"
            }`}
          >
            <ShoppingCart className="mr-2 w-4 md:w-5" />
            Keranjang
          </Link>
        </li>
        <li className="flex items-center">
          <Link
            href="/promo"
            className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
              pathname === "/promo" ? "text-red-500" : "text-black"
            }`}
          >
            <Tag className="mr-2 w-4 md:w-5" />
            Promo
          </Link>
        </li>
        <li className="flex items-center">
          {!isLogin ? (
            <Link
              href="/login"
              className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
                pathname === "/login" ? "text-red-500" : "text-black"
              }`}
            >
              <LogIn className="mr-2 w-4 md:w-5" />
              Masuk
            </Link>
          ) : (
            <Link
              href="/profile"
              className={`text-sm md:text-base flex flex-col md:flex-row items-center justify-center ${
                pathname === "/profile" ? "text-red-500" : "text-black"
              }`}
            >
              <User className="mr-2 w-4 md:w-5" />
              Akun
            </Link>
          )}
        </li>
      </ul>
    </Navbox>
  );
};

export default Navbar;
