import Image from "next/image";
import React from "react";
import WelcomeBanner from "./WelcomeBanner";
const WelcomeScreen = ({onSubmit}) => {
  
  return (
    <div className="bg-black flex flex-col justify-evenly h-full min-h-[calc(100vh_-_60px)]">
      <div className="flex flex-col gap-10 text-center">
        <h1 className="text-white font-bold uppercase text-2xl">Linki tu nueva tarjeta de presentacion digital</h1>
      </div>
      <div className="w-[275px] mx-auto">
        <WelcomeBanner />
      </div>
      <button
        onClick={onSubmit}
        className="w-full max-w-[300px] mx-auto inline-flex items-center justify-center  py-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-[#5F2BF8] border border-transparent rounded-md active:bg-gray-900"
      >
        Crear cuenta
      </button>
    </div>
  );
};

export default WelcomeScreen;
