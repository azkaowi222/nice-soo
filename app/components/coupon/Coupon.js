"use client";

import React from "react";
import { useState } from "react";
const Coupon = () => {
  const [showCoupoButton, setshowCoupoButton] = useState(false);
  return (
    <div className="cupon relative">
      <input
        type="text"
        name="cupon"
        onChange={(e) => {
          const isHasValue = e.target.value.length > 0;
          if (isHasValue) {
            setshowCoupoButton(true);
          } else {
            setshowCoupoButton(false);
          }
        }}
        className="border focus:outline-black border-gray-300 p-4 text-xl w-full"
        placeholder="Kode kupon (Opsional)"
      />
      <button
        disabled={showCoupoButton}
        className={`absolute ${
          showCoupoButton
            ? "bg-[#282828] text-white cursor-pointer"
            : "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed "
        } transition-all duration-500 ease-in-out top-3 py-2 px-4 right-2`}
      >
        Gunakan
      </button>
    </div>
  );
};

export default Coupon;
