import Image from "next/image";
import React from "react";
import BannerImage from "../../public/images/banner.png";
import QrImage from "./QrImage";
const Banner = ({banner}) => {
  // const src = banner.data?.attributes.url || 'https://res.cloudinary.com/dxahth8ul/image/upload/v1685506549/small_joel_jasmin_forestbird_N7_WK_Dfi0yq_Q_unsplash_jpg_a6d1fd24f6.png'
  // const myLoader = ({ src }) => {
  //   return src
  // }
  return (
    <div className="w-full absolute">
      <div className="brightness-50">
        <Image 
          className="h-full max-h-60" 
          src={BannerImage} 
          alt="banner" />
      </div>
    </div>
  );
};

export default Banner;
