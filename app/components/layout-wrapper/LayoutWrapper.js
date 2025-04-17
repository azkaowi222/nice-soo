"use client";

import { usePathname } from "next/navigation";
import React from "react";
import TopNavbar from "../navbar/top-nav/TopNav";
import Navbar from "../navbar/Navbar";

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/dashboard", "/admin"];
  const showNavbar = !hideNavbarRoutes.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <>
      {showNavbar && (
        <>
          <TopNavbar />
          <Navbar />
        </>
      )}
      {children}
    </>
  );
};

export default LayoutWrapper;
