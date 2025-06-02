import Image from "next/image";
import Title from "../components/title/Title";
import {
  SquarePen,
  LockKeyhole,
  ChevronRight,
  UserRoundCog,
  Star,
} from "lucide-react";
import { LogoutButton } from "../components/logout-buton/LogoutButton";
import { cookies } from "next/headers";
import TopNavbar from "../components/navbar/top-nav/TopNav";
import Navbar from "../components/navbar/Navbar";
import Link from "next/link";
const Profile = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const response = await fetch("http://localhost:8000/api/user", {
    headers: {
      Authorization: `Bearer ${token.value}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const user = await response.json();
  return (
    <>
      <TopNavbar />
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
          <Link
            href="/profile/change-pass"
            className="btn-password w-full bg-[white] shadow-md rounded-lg mt-4 flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2.5">
              <LockKeyhole size={20} />
              <button className="pointer-events-none">Ganti Kata Sandi</button>
            </div>
            <ChevronRight size={20} />
          </Link>
          <Link
            href="/profile/info-profile"
            className="btn-password w-full bg-[white] shadow-md rounded-lg mt-4 flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2.5">
              <UserRoundCog size={20} />
              <button className="pointer-events-none">Atur Akun</button>
            </div>
            <ChevronRight size={20} />
          </Link>
          <Link
            href="/profile/review"
            className="btn-password w-full bg-[white] shadow-md rounded-lg mt-4 flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-2.5">
              <Star size={20} />
              <button className="pointer-events-none">Ulasan</button>
            </div>
            <ChevronRight size={20} />
          </Link>
        </div>
        <LogoutButton />
      </div>
      <Navbar />
    </>
  );
};

export default Profile;
