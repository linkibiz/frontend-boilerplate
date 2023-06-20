import Image from "next/image";
import React from "react";
import Logo from "../../public/images/linki-logo.png";

const Banner = ({banner}) => {
<<<<<<< HEAD
  // bg-gradient-to-r from-[#4eb1c7] via-[#384a74] to-[#483e83]
  const src = banner.attributes.banner.data?.attributes.url || 'https://res.cloudinary.com/dxahth8ul/image/upload/v1685506549/small_joel_jasmin_forestbird_N7_WK_Dfi0yq_Q_unsplash_jpg_a6d1fd24f6.png'
=======
  console.log(banner)
  const src = banner.data?.attributes.url || 'https://res.cloudinary.com/dxahth8ul/image/upload/v1685506549/small_joel_jasmin_forestbird_N7_WK_Dfi0yq_Q_unsplash_jpg_a6d1fd24f6.png'
>>>>>>> gaby-carrizo
  const myLoader = ({ src }) => {
    return src
  }
  return (
    <div className="relative w-full">
      <Image src={Logo} className="z-10 max-h-8 object-contain absolute top-4 left-4 w-32" />
      <div className="brightness-50">
        <Image 
          className="h-full max-h-60 object-cover object-bottom" 
          loader={myLoader}
          width={500}
          height={500}
          src={src} 
          alt="banner" />
      </div>
    </div>
  );
};

export default Banner;
