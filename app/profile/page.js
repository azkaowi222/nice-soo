"use client";

import Image from "next/image";
import Title from "../components/title/Title";
import {
  SquarePen,
  LockKeyhole,
  ChevronRight,
  UserRoundCog,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Loader from "../components/loader/Loader";
import getUser from "../utils/getUser";
const Profile = () => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    getUser()
      .then((user) => setUser(user))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Title title={"Akun"} />
      <div className="px-4">
        <div className="detail flex justify-center flex-col items-center mt-4">
          <div className="img-box relative p-3">
            <Image
              src={"/images/profile-png.png"}
              width={80}
              height={80}
              alt="profile"
            />
            <div className="pen bg-[#FFFFFF] w-fit p-2 rounded-full absolute bottom-4 right-3 cursor-pointer">
              <SquarePen color="black" size={15} />
            </div>
          </div>
          <div className="name -mt-3 flex flex-col items-center">
            <h1 className="text-lg">{user?.email}</h1>
            <p className="text-[#A98C8A]">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
        </div>
        <div className="btn-act">
          <a
            href="/profile/change-pass"
            className="btn-password w-full bg-[white] shadow-md rounded-lg mt-4 flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2.5">
              <LockKeyhole size={20} />
              <button className="pointer-events-none">Ganti Kata Sandi</button>
            </div>
            <ChevronRight size={20} />
          </a>
          <a
            href="/profile/info-profile"
            className="btn-password w-full bg-[white] shadow-md rounded-lg mt-4 flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2.5">
              <UserRoundCog size={20} />
              <button className="pointer-events-none">Atur Akun</button>
            </div>
            <ChevronRight size={20} />
          </a>
          <a
            href="/profile/review"
            className="btn-password w-full bg-[white] shadow-md rounded-lg mt-4 flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2.5">
              <Star size={20} />
              <button className="pointer-events-none">Ulasan</button>
            </div>
            <ChevronRight size={20} />
          </a>
        </div>
        <button
          onClick={handleLogOut}
          className="bg-[#A98C8A] p-3 mt-4 w-full rounded-md cursor-pointer"
        >
          Keluar
        </button>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default Profile;
