import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = ({ data }) => {
  return (
    <Layout pageName="Home">
      <div className="flex flex-col items-center justify-center h-screen max-w-[90%] mx-auto">
        {/* Video Section */}
        <div className="gif-container">
          <Image src="/images/linki-gif.gif" alt="Your GIF" width={300} height={300} layout="intrinsic" />
        </div>
        {/* Buttons Section */}
        <div className="buttons-container mt-4 flex flex-col gap-4 w-full">
          <Link href="/signup" passHref className="py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center">
            Crear cuenta
          </Link>
          <Link href="/login" passHref className="py-4 px-5 w-full bg-[#D3D3D3] text-black rounded-lg font-bold text-center">
            Acceder a cuenta
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
