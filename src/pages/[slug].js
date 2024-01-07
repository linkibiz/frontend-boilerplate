import About from "@/components/About";
import Banner from "@/components/Banner";
import ContactButtons from "@/components/ContactButtons";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Links from "@/components/Links";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import QrImage from "@/components/QrImage";
import SocialLinks from "@/components/SocialLinks";
import Vcard from "@/components/Vcard";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import React from "react";
import LoadingComponent from "@/components/LoadingComponent";
import Link from "next/link";
import HomeLayout from "@/components/HomeLayout";
import BrushIcon from "@/components/Icons/BrushIcon";
const Perfil = ({ data }) => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(data.attributes.redes_sociales)
  return (
    <HomeLayout pageName={slug}>
      <LoadingComponent>
        <Banner />
        <Wrapper>
          <Navbar />
          <Profile profileData={data} />
          <div className="flex w-full gap-5">
            <QrImage value={slug} />
            {data.attributes.vcard != null && <Vcard vcardData={data} />}
          </div>
          {data.attributes.contact_buttons && <ContactButtons contactButtons={data.attributes.contact_buttons} />}
          {data.attributes.sobre_mi != "" && <About info={data.attributes.sobre_mi} />}
          {data.attributes.redes_sociales != null && <SocialLinks socialLinks={data.attributes.redes_sociales} />}
          {data.attributes.links.length > 0 && <Links linksList={data.attributes.links} />}
        </Wrapper>
      </LoadingComponent>

      {/* <Footer/> */}
    </HomeLayout>
  );
};

export default Perfil;

export async function getServerSideProps({ query: { slug } }) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles?filters[slug][$eq]=${slug}&populate=deep`;
  const req = await fetch(url);
  const res = await req.json();
  const data = res.data[0];
  return {
    props: {
      data,
    },
  };
}
