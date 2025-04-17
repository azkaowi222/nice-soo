// const Register = () => {
//   return (
//     <div>
//       <h1>Page Register</h1>
//     </div>
//   );
// };

// export default Register;

"use client";
import Image from "next/image";
import { EyeOff, Eye } from "react-feather";
import { useState } from "react";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container h-[510px] flex flex-col items-center justify-center max-w-none">
      {/* <Logo /> */}
      <form className="w-full md:w-[500px]">
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
                // autoComplete="off"
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
                // autoComplete="off"
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
              Sudah Punya Akun?
              <a href="/login" className="text-[#0d92f4]">
                {" "}
                Masuk
              </a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
