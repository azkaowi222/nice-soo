"use client";
import Loader from "@/app/components/loader/Loader";
import Navbar from "@/app/components/navbar/Navbar";
import TopNavbar from "@/app/components/navbar/top-nav/TopNav";
import { ChevronLeft, Info } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ChangePass = () => {
  const [new_password, setNewPassword] = useState(null);
  const [new_password_confirmation, setNewPasswordConfirmation] =
    useState(null);
  const [alert, setAlert] = useState(false);
  const [errMessage, setMessage] = useState({
    success: null,
    message: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePass = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8000/api/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        new_password,
        new_password_confirmation,
      }),
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.status !== 200) {
      setAlert(true);
      setMessage({
        success: false,
        message: data?.message,
      });
      return;
    }
    setAlert(true);
    setMessage({
      success: true,
      message: data?.message,
    });
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false); // kembali ke kiri
      }, 2000); // hilang setelah 2 detik
      return () => clearTimeout(timer); // cleanup
    }
  }, [alert]);

  return (
    <>
      <TopNavbar />
      <div className="p-4">
        <div className="back-btn flex justify-center">
          <Link
            href="/profile"
            className="px-4 py-2 rounded-md cursor-pointer flex items-center border gap-2"
          >
            <ChevronLeft size={22} />
            Kembali
          </Link>
        </div>
        <form onSubmit={handleChangePass}>
          <div className="input-box flex flex-col gap-6 mt-16">
            <div className="password-box relative">
              <input
                id="password"
                className="border p-4 rounded-md w-full bg-white"
                required
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              <label
                htmlFor="password"
                className="absolute top-4 left-4 transition-all duration-300 ease-in-out pointer-events-none"
              >
                Password Baru *
              </label>
            </div>
            <div className="new-password-box relative">
              <input
                id="new-password"
                className="border p-4 rounded-md w-full bg-white"
                required
                type="password"
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              ></input>
              <label
                htmlFor="new-password"
                className="absolute top-4 left-4 transition-all duration-300 ease-in-out pointer-events-none"
              >
                Ulangi Password *
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="p-3 rounded-md bg-[#A98C8A] w-full mt-4 cursor-pointer"
          >
            Simpan
          </button>
        </form>
      </div>
      <div
        className={`alert-box flex justify-center mt-10 ${
          alert ? "-translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-in-out `}
      >
        <div
          className={`flex items-center gap-2 w-fit p-3 rounded-m ${
            errMessage.success ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <Info color="white" />
          <p className="text-white">{errMessage?.message}</p>
        </div>
      </div>
      <Loader isLoading={isLoading} />
      <Navbar />
    </>
  );
};

export default ChangePass;
