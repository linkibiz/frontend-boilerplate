import Image from "next/image";
import React, { useEffect } from "react";

const Profile = ({ profileData }) => {
  const {
    nombre_completo,
    ocupacion,
    avatar
  } = profileData.attributes;

  const src = avatar.data.attributes.url || 'https://res.cloudinary.com/dxahth8ul/image/upload/v1685506549/small_joel_jasmin_forestbird_N7_WK_Dfi0yq_Q_unsplash_jpg_a6d1fd24f6.png'
  const myLoader = ({ src }) => {
    return src
  }
  
  return (
    <>
      <div className="w-full -space-x-1 mt-[-45%] relative z-10 shadow-lg rounded-3xl">
        <div className="flex items-center bg-white rounded-3xl">
          <Image
            className="rounded-l-3xl inline-block object-cover h-52 w-52"
            loader={myLoader}
            src={src}
            width={500}
            height={500}
            alt={`Foto de ${nombre_completo}`}
          />
          <div className="text-black w-full flex flex-col items-center gap-y-3.5">
            <h1 className="font-bold text-3xl text-center">{nombre_completo}</h1>
            <p className="text-xs tracking-wider font-bold">{ocupacion}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
