import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <div className="md:block">
      <Link href="/" className="logo flex items-center">
        <Image
          className="md:w-20 w-18 aspect-square object-cover cursor-pointer md:block"
          src={"/images/niceso-tp.png"}
          priority={true}
          alt="logo"
          width={100}
          height={50}
        />
        <h3 className="text-2xl font-semibold custom-font md:block">Nice So</h3>
      </Link>
    </div>
  );
};

export default Logo;
