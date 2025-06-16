// "use client";
import Logo from "@/app/components/logo/Logo";
import React from "react";
import { X, MapPin, Users, ArrowRight, Gift, UserPlus } from "react-feather";

const NavItems = ({ isOpen = false, setIsOpen }) => {
  return (
    <>
      <div
        className={`overlay fixed top-0 left-0 w-full h-full z-10 ${
          !isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 w-72 h-screen z-20 bg-custom px-4 ${
          !isOpen ? "translate-x-full" : "translate-x-0"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between pl-14">
          <Logo />
          <button className="btn-close" onClick={() => setIsOpen(false)}>
            <X className="cursor-pointer self-start mt-2 ml-1" />
          </button>
        </div>
        <div className="line h-1 mt-2"></div>
        <ul className="mt-5 flex gap-5 flex-col">
          <li className="location flex justify-between items-center">
            <a
              href="https://www.google.com/maps/place/Nice+So+Ciceri+Serang/@-6.1248856,106.1713132,21z/data=!4m14!1m7!3m6!1s0x2e41f51b5ac86ea7:0xe5465472d5a74830!2sNice+So+Ciceri+Serang!8m2!3d-6.1249213!4d106.1713893!16s%2Fg%2F11q2xfnn6q!3m5!1s0x2e41f51b5ac86ea7:0xe5465472d5a74830!8m2!3d-6.1249213!4d106.1713893!16s%2Fg%2F11q2xfnn6q?entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D"
              className="flex items-center"
            >
              <MapPin className="inline-block mr-2 w-4.5" />
              Lokasi Cabang
            </a>
            <ArrowRight className="inline-block w-4.5" />
          </li>
          <li className="location flex justify-between items-center">
            <a href="#" className="flex items-center">
              <Gift className="inline-block mr-2 w-4.5" />
              Voucher
            </a>
            <ArrowRight className="inline-block w-4.5" />
          </li>

          <li className="location flex justify-between items-center">
            <a href="/about" className="flex items-center">
              <Users className="inline-block mr-2 w-4.5" />
              Tentang Kami
            </a>
            <ArrowRight className="inline-block w-4.5" />
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavItems;
