import React from "react";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-black text-white">
      <div className="flex items-center">
        <Image src={Logo} alt="Linki Logo" className="h-8 w-auto" />
      </div>
      <div className="py-1 px-6 border border-[#FF7644] rounded-md">
        <Link href="https://linkibiz.com/" target="_blank" className=" text-[#FF7644] uppercase text-xs">
          SHOP
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
