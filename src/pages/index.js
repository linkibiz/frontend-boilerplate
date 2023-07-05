import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";

const Home = ({ data }) => {
  return (
    <Layout pageName="Home">
      <div className="flex items-center justify-center h-screen text-center">
        Porfavor entrar desde el link que se les proporciono 
      </div>
    </Layout>
  );
};

export default Home;
