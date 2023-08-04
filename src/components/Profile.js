import Image from "next/image";
import React, { useEffect } from "react";

const Profile = ({ profileData }) => {
  const { nombre_completo, ocupacion, avatar } = profileData.attributes;

  const src = avatar.data?.attributes.url || "";
  const myLoader = ({ src }) => {
    return src;
  };

  const splitName = nombre_completo
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  return (
    <>
      <div className="w-full -space-x-1 relative z-10 shadow-lg rounded-3xl">
        <div className="flex items-center bg-black rounded-3xl border border-[#575656]">
          {src === "" ? (
            ""
          ) : (
            <Image
              className="rounded-l-3xl inline-block object-cover h-48 max-w-[50%]"
              loader={myLoader}
              src={src}
              width={500}
              height={500}
              alt={`Foto perfil de ${nombre_completo}`}
            />
          )}

          <div className="text-white w-full flex flex-col items-start gap-y-3.5 p-5 items-center">
            <h1 className="font-bold text-3xl text-left">{nombre_completo}</h1>
            <p className="text-xs tracking-wider font-bold">{ocupacion}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
