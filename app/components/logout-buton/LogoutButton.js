"use client";
import { useState } from "react";
import Loader from "../loader/Loader";
import { redirect } from "next/navigation";
export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.clear();
    setIsLoading(false);
    redirect("/login");
  };
  return (
    <>
      <button
        onClick={handleLogOut}
        className="bg-[#A98C8A] p-3 mt-4 w-full rounded-md cursor-pointer"
      >
        Keluar
      </button>
      <Loader isLoading={isLoading} />
    </>
  );
};
