import {
  ChevronLeft,
  CircleUserRoundIcon,
  SquarePen,
  Phone,
  Mail,
  Mars,
  CalendarDays,
} from "lucide-react";

const InfoProfile = () => {
  return (
    <div className="p-4">
      <div className="back-btn flex justify-center">
        <a
          href="/profile"
          className="px-4 py-2 rounded-md cursor-pointer flex items-center border gap-2"
        >
          <ChevronLeft size={22} />
          Kembali
        </a>
      </div>
      <div className="info-profile mt-16">
        <div className="name-box flex gap-3 items-center p-4 rounded-md bg-white">
          <CircleUserRoundIcon size={40} />
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="text-gray-400">Nama Lengkap</span>
              <h3>Arman Maulana</h3>
            </div>
            <SquarePen size={22} className="cursor-pointer" />
          </div>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="phone-box flex gap-3 items-center p-4 rounded-md bg-white">
          <Phone size={38} />
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="text-gray-400">No Handphone</span>
              <h3>081380486807</h3>
            </div>
            <SquarePen size={22} className="cursor-pointer" />
          </div>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="mail-box flex gap-3 items-center p-4 rounded-md bg-white">
          <Mail size={38} />
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="text-gray-400">Alamat Email</span>
              <h3>maximkelly659@gmail.com</h3>
            </div>
            <SquarePen size={22} className="cursor-pointer" />
          </div>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="mail-box flex gap-3 items-center p-4 rounded-md bg-white">
          <Mars size={38} />
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="text-gray-400">Jenis Kelamin</span>
              <h3>Laki-Laki</h3>
            </div>
            <SquarePen size={22} className="cursor-pointer" />
          </div>
        </div>
        <hr className="w-full text-gray-300" />
        <div className="born-date-box flex gap-3 items-center p-4 rounded-md bg-white">
          <CalendarDays size={38} />
          <div className="w-full flex justify-between items-center">
            <div>
              <span className="text-gray-400">Tempat & Tanggal Lahir</span>
              <h3>Serang, 29-11-2003</h3>
            </div>
            <SquarePen size={22} className="cursor-pointer" />
          </div>
        </div>
        <hr className="w-full text-gray-300" />
      </div>
    </div>
  );
};

export default InfoProfile;
