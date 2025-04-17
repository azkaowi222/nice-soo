"use client";
import Image from "next/image";
import { EyeOff, Eye } from "react-feather";
import { useState } from "react";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container h-[458px] flex flex-col items-center justify-center max-w-none">
      {/* <Logo /> */}
      <form className="w-full md:w-[500px]">
        <h1 className="text-2xl font-semibold tracking-wider text-center">
          Masuk
        </h1>
        <div className="input-box flex flex-col p-4 gap-6">
          <div className="email-box relative">
            <input
              type="text"
              id="email"
              className="border p-3 rounded-2xl w-full bg-white"
              // autoComplete="off"
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
              // autoComplete="off"
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
          <a
            href="/forgot-password"
            className="text-end cursor-pointer text-sm -mt-3 tracking-wider"
          >
            Lupa Password?
          </a>
          <div className="submit-box flex flex-col gap-2 items-center">
            <input
              type="submit"
              className="cursor-pointer w-full border p-2.5 text-xl rounded-2xl bg-[#0d92f4] text-white tracking-widest"
              value="Masuk"
            />
            <span className="text-gray-500 tracking-widest">Atau</span>
            <button className="flex justify-center items-center border w-full p-2.5 gap-2 bg-white rounded-2xl cursor-pointer">
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
              <a href="/register" className="text-[#0d92f4]">
                {" "}
                Daftar
              </a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
