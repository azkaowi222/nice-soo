"use client";
import Image from "next/image";
import { EyeOff, Eye, Info } from "react-feather";
import { useEffect, useState } from "react";
import React from "react";
import { redirect } from "next/navigation";
import Loader from "@/app/components/loader/Loader";
import Link from "next/link";
const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    setIsLoading(false);
    if (response.status !== 200) {
      setAlert(true);
      return;
    }
    localStorage.setItem("token", data.access_token);
    redirect("/profile");
  };

  const handleLoginGoogle = async () => {
    window.location.href = "http://localhost:8000/api/auth/google";
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
      <div className="container h-[458px] flex flex-col items-center justify-center max-w-none">
        <form className="w-full md:w-[500px]" onSubmit={handleLogin}>
          <h1 className="text-2xl font-semibold tracking-wider text-center">
            Masuk
          </h1>
          <div className="input-box flex flex-col p-4 gap-6">
            <div className="email-box relative">
              <input
                type="text"
                id="email"
                className="border p-3 rounded-2xl w-full bg-white"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <label
                htmlFor="email"
                className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
              >
                Email *
              </label>
            </div>
            <div className="password-box relative">
              <input
                type={!showPassword ? "password" : "text"}
                id="password"
                className="border p-3 rounded-2xl w-full bg-white"
                onChange={(e) => setPassword(e.target.value)}
                required
              ></input>
              <label
                htmlFor="password"
                className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
              >
                Password *
              </label>
              <input
                type="checkbox"
                id="checkbox"
                className="absolute top-5 right-3 w-8 z-10 scale-150 opacity-0 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
              {!showPassword ? (
                <EyeOff size={18} className="absolute top-4 right-3 w-8" />
              ) : (
                <Eye size={18} className="absolute top-4 right-3 w-8" />
              )}
            </div>
            <Link
              href="/forgot-password"
              className="text-end cursor-pointer text-sm -mt-3 tracking-wider"
            >
              Lupa Password?
            </Link>

            <div className="submit-box flex flex-col gap-2 items-center">
              <input
                type="submit"
                className="cursor-pointer w-full border p-2.5 text-xl rounded-2xl bg-[#0d92f4] text-white tracking-widest"
                value="Masuk"
              />
              <span className="text-gray-500 tracking-widest">Atau</span>
              <button
                type="button"
                onClick={handleLoginGoogle}
                className="flex justify-center items-center border w-full p-2.5 gap-2 bg-white rounded-2xl cursor-pointer"
              >
                <Image
                  src={"/images/google.png"}
                  alt={"google"}
                  width={30}
                  height={30}
                />
                Lanjutkan dengan Google
              </button>
              <span className="text-gray-500 tracking-wider">
                Belum Punya Akun?
                <Link href="/register" className="text-[#0d92f4]">
                  {" "}
                  Daftar
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`alert-box flex justify-center mt-10 ${
          alert ? "-translate-x-0" : "-translate-x-full"
        } transition-all duration-500 ease-in-out`}
      >
        <div className="flex items-center gap-2 w-fit bg-red-600 p-3 rounded-md">
          <Info color="white" />
          <p className="text-white">Invalid username or password</p>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Login;
