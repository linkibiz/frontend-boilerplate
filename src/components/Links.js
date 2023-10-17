import Link from "next/link";
import React, { useState } from "react";
import RightArrowIcon from "./Icons/RightArrowIcon";
const Links = ({ linksList }) => {
  return (
    <>
      {linksList.length > 0 && (
        <div className="flex flex-col gap-3 w-full items-left">
          <p className="font-bold text-black tracking-[0.2em]">Links</p>
          {linksList.map((link) => (
            <div key={link.id}>
              <Link
                href={`https://${link.url}`}
                target="_blank"
                className="w-full tracking-[0.2em] p-[15px] font-bold text-left bg-white rounded-xl text-black uppercase text-xs flex items-center justify-between"
              >
                <h3 className=" text-center grow">{link.titulo}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Links;
