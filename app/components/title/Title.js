import Link from "next/link";
import React from "react";
import { ChevronLeft } from "react-feather";

const Title = ({ title, center = true, hasIcon = false }) => {
  return (
    <div
      className={`${
        hasIcon && "flex"
      } items-center gap-3 px-2 py-5 shadow-md bg-white`}
    >
      {hasIcon && (
        <Link href={"/cart"}>
          <ChevronLeft />
        </Link>
      )}
      <h1
        className={`text-xl font-semibold spacing tracking-wider ${
          center ? "text-center" : "text-left"
        }`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Title;
