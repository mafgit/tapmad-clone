import Image from "next/image";
import Link from "next/link";
import { FaBars, FaChevronDown, FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="w-full backdrop-blur-3xl flex items-center gap-12 h-[70px] shadow-lg shadow-[#1d1f2460] p-4 px-6 box-border fixed top-0 left-0 z-80 bg-[#1d1f24ef] text-gray-400">
      <div className="flex items-center justify-center gap-8">
        <button>
          <FaBars className="text-[20px]" />
        </button>{" "}
        <Image src="/logo.png" width={120} height={40} alt="logo" />
      </div>
      <nav className="flex gap-4 justify-center items-center font-semibold h-full">
        <Link
          className={
            "h-max  " +
            (true ? "border-b-2 border-[#37c673] text-[#37c673]" : "")
          }
          href="/"
        >
          Home
        </Link>
        <Link className="h-max " href="/">
          Home
        </Link>
        <Link className="h-max " href="/">
          Home
        </Link>
        <Link className="h-max " href="/">
          Home
        </Link>
        <Link className="h-max " href="/">
          Home
        </Link>
        <Link className="rounded-md text-black" href="/">
          <button className="rounded-md bg-[#37c673] px-4 py-2 h-full w-full">
            Tapshop
          </button>
        </Link>
      </nav>
      <div className="ml-auto flex justify-center items-center gap-8">
        <FaMagnifyingGlass />
        <button className="flex gap-2 justify-center items-center">
          <span>Login</span>
          <FaChevronDown className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
