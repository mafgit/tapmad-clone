import Link from "next/link";
import React from "react";
import {
  FaAppStore,
  FaChevronRight,
  FaFacebook,
  FaGooglePlay,
  FaInstagram,
  FaLinkedin,
  FaPlaystation,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex items-center justify-around p-[20px] py-[30px] bg-[#1d1f24fa]">
      <div className="flex flex-col justify-center items-start gap-4">
        <h2 className="text-xl font-bold">Connect with us</h2>
        <div className="flex gap-2 items-center justify-around">
          <Link className="bg-blue-400 p-2 rounded-md" href="/">
            <FaFacebook />
          </Link>
          <Link className="bg-blue-500 p-2 rounded-md" href="/">
            <FaLinkedin />
          </Link>
          <Link className="bg-red-400 p-2 rounded-md" href="/">
            <FaInstagram />
          </Link>
          <Link className="bg-black p-2 rounded-md" href="/">
            <FaXTwitter />
          </Link>
          <Link className="bg-red-600 p-2 rounded-md" href="/">
            <FaYoutube />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl font-bold">Tapmad Legal Center</h2>
        <div className="flex flex-col gap-1 items-center justify-start">
          <Link className="flex w-full items-center justify-start gap-2" href="/">
            <FaChevronRight className="text-sm" />
            <span>Legal Center</span>
          </Link>
          <Link className="flex w-full items-center justify-start gap-2" href="/">
            <FaChevronRight className="text-sm" />
            <span>Our Blog</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-2">
        <h2 className="text-xl font-bold">Download our app</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            className="flex items-center justify-center gap-3 bg-black rounded-md px-2 py-1"
            href="/"
          >
            <FaAppStore className="text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px]">Download on</span>
              <p className="text-[12px]">App Store</p>
            </div>
          </Link>

          <Link
            className="flex items-center justify-center gap-3 bg-black rounded-md px-2 py-1"
            href="/"
          >
            <FaGooglePlay className="text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px]">Download on</span>
              <p className="text-[12px]">App Store</p>
            </div>
          </Link>

          <Link
            className="flex items-center justify-center gap-3 bg-black rounded-md px-2 py-1"
            href="/"
          >
            <FaPlaystation className="text-xl" />
            <div className="flex flex-col">
              <span className="text-[10px]">Download on</span>
              <p className="text-[12px]">App Store</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
