"use client";

import { usePathname } from "next/navigation";
import React from "react";

const BodyWrapper = ({ children }) => {
  const pathname = usePathname();

  // Tambahkan kondisi di sini
  const isAdminOrCheckoutPage =
    pathname.startsWith("/dashboard/admin") || pathname.startsWith("/checkout");

  //   const customClass = isAdminPage
  //     ? "" // class khusus admin
  //     : "bg-white text-neutral-800"; // default
  return (
    <body
      className={`${
        isAdminOrCheckoutPage ? "pt-0 pb-0 antialiased relative" : "pt-20 pb-20"
      } antialiased relative`}
    >
      {children}
    </body>
  );
};

export default BodyWrapper;
