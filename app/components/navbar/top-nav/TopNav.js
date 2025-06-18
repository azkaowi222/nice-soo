"use client";
import NavItems from "../nav-items/NavItems";
import { useState } from "react";
import Logo from "../../logo/Logo";
import React from "react";

const TopNavbar = () => {
  const [open, setIsOpen] = useState(false);
  const handleNavbar = () => {
    setIsOpen(true);
  };
  return (
    <header className="box-shadow w-full h-18 md:hidden bg-white fixed top-0 z-10">
      <nav className="flex justify-between items-center h-full px-5">
        <Logo />
        {/* <div
          className="hamburger-menu box-border p-1.5 relative"
          onClick={handleNavbar}
        >
          <div className="hamburger-item"></div>
          <div className="hamburger-item"></div>
          <div className="hamburger-item"></div>
        </div> */}
      </nav>
      <NavItems isOpen={open} setIsOpen={setIsOpen} />
    </header>
  );
};

export default TopNavbar;
