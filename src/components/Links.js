import Link from "next/link";
import React, { useState } from "react";
import RightArrowIcon from "./Icons/RightArrowIcon";
const Links = ({ linksList }) => {
  return (
    <>
      {linksList.length > 0 && (
        <div className="flex flex-col gap-3 w-full items-left">
          <p className="font-bold text-white tracking-[0.2em]">Links</p>
          {linksList.map((link) => (
            <>
              <Link
                href={link.url}
                target={link.target}
                className="w-full tracking-[0.2em] py-[10px] px-[20px] font-bold text-left bg-[#272727] rounded-xl text-white uppercase text-xs flex items-center justify-between"
                key={link.id}
              >
                {link.titulo}
                <div className=" h-4">
                  <RightArrowIcon />
                </div>
              </Link>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Links;
