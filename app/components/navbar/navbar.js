"use client";
import { Home, ShoppingCart, Tag, LogIn, User } from "react-feather";
import Image from "next/image";
import Navbox from "./nav-box/Navbox";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";

const Navbar = () => {
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      const localToken = localStorage.getItem("token");

      if (!localToken) {
        setIsLogin(false);
        return;
      }

      try {
        // Validasi token langsung ke backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-token`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const { token } = await response.json();
        if (token) {
          setIsLogin(true);
        } else {
          localStorage.clear();
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error validating auth:", error);
        // Network error - bisa tetap anggap login atau tidak
        // Tergantung preferensi UX Anda
        setIsLogin(false);
      }
    };

    validateAuth();

    // Periodic check untuk handle token expiry
    // const interval = setInterval(validateAuth, 5 * 60 * 1000); // 5 menit

    // return () => clearInterval(interval);
  }, []);

  if (isLogin === null) return null;

  return (
    <Navbox>
      <div className="hidden md:block">
        <Link
          onClick={() => setIsLoading(true)}
          href="/"
          className="logo flex items-center"
        >
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
            onClick={() => setIsLoading(true)}
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
            onClick={() => setIsLoading(true)}
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
            onClick={() => setIsLoading(true)}
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
              onClick={() => setIsLoading(true)}
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
              onClick={() => setIsLoading(true)}
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
      <Loader isLoading={isLoading} />
    </Navbox>
  );
};

export default Navbar;
