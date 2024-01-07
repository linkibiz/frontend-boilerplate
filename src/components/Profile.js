import Image from "next/image";
import React, { useEffect } from "react";
import BrushIcon from "./Icons/BrushIcon";
import { useRouter } from "next/router";
import { getToken } from "@/utils/helpers";
import { useAuthContext } from "./AuthProvider/AuthProvider";

const Profile = ({ profileData }) => {
  const { userData } = useAuthContext();
  const { nombre_completo, ocupacion, avatar } = profileData.attributes;
  const router = useRouter();
  const { slug } = router.query;
  const src = avatar.data?.attributes.url || "";
  const myLoader = ({ src }) => {
    return src;
  };

  const navigateToEdit = () => {
    router.push(`/${slug}/profile/edit`);
  };

  const isUserOwnProfile = () => {
    return userData && userData.slug === slug;
  };

  return (
    <>
      <div className="w-full -space-x-1 relative z-10 shadow-lg rounded-3xl">
        <div className={`relative flex items-center bg-white rounded-3xl ${avatar.data === null ? "min-h-[175px] justify-center" : ""}`}>
          {src === "" ? (
            ""
          ) : (
            <Image
              className="rounded-l-3xl inline-block object-cover h-fit max-w-[50%] min-h-[175px]"
              loader={myLoader}
              src={src}
              width={500}
              height={500}
              alt={`Foto perfil de ${nombre_completo}`}
            />
          )}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50">
            {isUserOwnProfile() && getToken() && (
              <button onClick={navigateToEdit} className="bg-[#20B6E4] rounded-tr-full rounded-br-full ">
                <BrushIcon />
              </button>
            )}
          </div>
          <div className="text-black w-full flex flex-col gap-y-3.5 p-5 items-center">
            <h1 className="font-bold text-3xl text-center">{nombre_completo}</h1>
            <p className="text-xs tracking-wider font-bold text-center">{ocupacion}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
