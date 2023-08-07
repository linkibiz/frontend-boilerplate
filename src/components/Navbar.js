import React from "react";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-transparent text-white z-10">
      <div className="flex items-center">
        <Image src={Logo} alt="Linki Logo" className="h-8 w-auto" />
      </div>
      <div className="py-1 px-6 border border-[#1eb5e5] rounded-md">
        <Link href="https://linkibiz.com/" target="_blank" className=" text-[#1eb5e5] uppercase text-xs">
          SHOP
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
