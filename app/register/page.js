"use client";
import Image from "next/image";
import { EyeOff, Eye } from "react-feather";
import { useEffect, useState } from "react";
import React from "react";
import { redirect } from "next/navigation";
import { Info } from "lucide-react";
import Link from "next/link";
import Loader from "../components/loader/Loader";
import TopNavbar from "../components/navbar/top-nav/TopNav";
import Navbar from "../components/navbar/Navbar";
const Register = () => {
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        password_confirmation: confirmpassword,
      }),
    });
    const { errors } = await response.json();
    setIsLoading(false);
    if (response.status !== 201) {
      setAlert(true);
      setErrorMessage(errors.password?.[0] ?? errors?.email[0]);
      return;
    }
    redirect("/login");
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
      <TopNavbar />
      <div className="container h-[600px] flex flex-col items-center justify-center max-w-none">
        {/* <Logo /> */}
        <form className="w-full md:w-[500px]" onSubmit={handleRegister}>
          <h1 className="text-2xl font-semibold tracking-wider text-center mb-2 ">
            Buat Akun Baru
          </h1>
          <div className="input-box flex flex-col p-4 gap-6">
            <div className="name-box flex items-center gap-3">
              <div className="firstName-box relative w-1/2 ">
                <input
                  type="text"
                  id="firstName"
                  className="border p-3 rounded-2xl w-full bg-white"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></input>
                <label
                  htmlFor="firstName"
                  className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
                >
                  Nama Depan *
                </label>
              </div>
              <div className="lastName-box flex gap-4 relative w-1/2">
                <input
                  type="text"
                  id="lastName"
                  className="border p-3 rounded-2xl w-full bg-white"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></input>
                <label
                  htmlFor="lastName"
                  className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
                >
                  Nama Belakang *
                </label>
              </div>
            </div>
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
            <div className="password-box relative flex flex-col gap-6">
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
            <div className="confirm-password-box relative flex flex-col gap-6">
              <input
                type={!showPassword ? "password" : "text"}
                id="confirm_password"
                className="border p-3 rounded-2xl w-full bg-white"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></input>
              <label
                htmlFor="confirm_password"
                className="absolute top-3 left-4 transition-all duration-300 ease-in-out pointer-events-none"
              >
                Confirm Password *
              </label>
              <input
                type="checkbox"
                id="checkbox-confirm"
                className="absolute top-5 right-3 w-8 z-10 scale-150 opacity-0 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
              {!showPassword ? (
                <EyeOff size={18} className="absolute top-4 right-3 w-8" />
              ) : (
                <Eye size={18} className="absolute top-4 right-3 w-8" />
              )}
            </div>
            <div className="submit-box flex flex-col gap-2 items-center">
              <input
                type="submit"
                className="cursor-pointer w-full border p-2.5 text-xl rounded-2xl bg-[#0d92f4] text-white tracking-widest"
                value="Daftar"
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
                Sudah Punya Akun?
                <Link href="/login" className="text-[#0d92f4]">
                  {" "}
                  Masuk
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
        <div
          className={`bg-red-600 flex items-center gap-2 w-fit p-3 rounded-md`}
        >
          <Info color="white" />
          <p className="text-white">{errorMessage}</p>
        </div>
      </div>
      <Loader isLoading={isLoading} />
      <Navbar />
    </>
  );
};

export default Register;
