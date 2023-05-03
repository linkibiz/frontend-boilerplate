import About from "@/components/About";
import Banner from "@/components/Banner";
import ContactButtons from "@/components/ContactButtons";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Links from "@/components/Links";
import Profile from "@/components/Profile";
import SocialLinks from "@/components/SocialLinks";
import Vcard from "@/components/Vcard";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import React from "react";

const Perfil = ({ data }) => {
  console.log(data)
  const router = useRouter();
  const { slug } = router.query;
  const pageTitle = slug.split(".").join(" ").toUpperCase();
  return (
    <Layout pageName={pageTitle}>
      <Banner banner={data}/>
      <Wrapper>
        <Profile profileData={data} />
        <Vcard vcardData={data} />
        <About info={data} />
        <ContactButtons contactButtons={data} />
        {/* <Links linksList={data.attributes.links} /> */}
        <SocialLinks socialLinks={data.attributes.redes_sociales} /> 
      </Wrapper>
      {/* <Footer/> */}
    </Layout>
  );
};

export default Perfil;

export async function getServerSideProps({ query: { slug } }) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles?filters[slug][$eq]=${slug}&populate=deep`;
  console.log(url)
  const req = await fetch(url);
  const res = await req.json();
  const data = res.data[0];
  return {
    props: {
      data,
    },
  };
}
