import Link from "next/link";
import React from "react";
const Links = ({ linksList }) => {
  console.log(linksList)
  return (
    <>
      {linksList && (
        <div className="flex flex-col gap-3 w-full items-left">
          <p className="font-bold">Links</p>
          {linksList.map((link) => (
            <Link
              href={link.url}
              target={link.target}
              className="w-full p-3 font-bold w-4/5 text-center bg-black rounded-md text-white"
              key={link.id}
            >
              {link.titulo}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Links;
