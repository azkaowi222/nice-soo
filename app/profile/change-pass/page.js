import { ChevronLeft } from "lucide-react";

const ChangePass = () => {
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
      <form>
        <div className="input-box flex flex-col gap-6 mt-16">
          <div className="password-box relative">
            <input
              id="password"
              className="border p-4 rounded-md w-full bg-white"
              required
              type="password"
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
  );
};

export default ChangePass;
