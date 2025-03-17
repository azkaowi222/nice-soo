import Image from "next/image";
import { Home, Heart, Tag, User } from "react-feather";

const Navbar = () => {
  return (
    <header className="w-full h-20 bg-white shadow-md">
      <nav className="flex justify-between items-center h-full px-10">
        <a href="/" className="logo">
          <Image
            className="w-20 aspect-square object-cover cursor-pointer"
            src={"/nice-soo-logo.png"}
            alt="logo"
            width={100}
            height={50}
          />
        </a>
        <ul className="nav-links flex gap-10">
          <li className="flex items-center justify-center">
            <Home className="mr-2 w-5" />
            <a href="/">Beranda</a>
          </li>
          <li className="flex items-center justify-center">
            <Heart className="mr-2 w-5" fill="red" color="red" />
            <a href="/favorite">Favorit</a>
          </li>
          <li className="flex items-center justify-center">
            <Tag className="mr-2 w-5" />
            <a href="/promo">Promo</a>
          </li>
          <li className="flex items-center justify-center">
            <User className="mr-2 w-5" />
            <a href="/login">Masuk</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
