"use client";

import { usePathname } from "next/navigation";
import React from "react";

const BodyWrapper = ({ children }) => {
  const pathname = usePathname();

  // Tambahkan kondisi di sini
  const isAdminPage = pathname.startsWith("/dashboard/admin");

  //   const customClass = isAdminPage
  //     ? "" // class khusus admin
  //     : "bg-white text-neutral-800"; // default

  return (
    <body
      className={`${
        isAdminPage ? "pt-0 pb-0 antialiased relative md:pt-22" : "pt-20 pb-20"
      } antialiased relative md:pt-22`}
    >
      {children}
    </body>
  );
};

export default BodyWrapper;
