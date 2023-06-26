import About from "@/components/About";
import Banner from "@/components/Banner";
import ContactButtons from "@/components/ContactButtons";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Links from "@/components/Links";
import Profile from "@/components/Profile";
import QrImage from "@/components/QrImage";
import SocialLinks from "@/components/SocialLinks";
import Vcard from "@/components/Vcard";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";
import React from "react";

const Perfil = ({ data }) => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(data);
  return (
    <Layout pageName={slug}>
      <Banner banner={data.attributes.banner} />
      <Wrapper>
        <Profile profileData={data} />
        <div className="flex w-full">
          {data.attributes.vcard != null && <Vcard vcardData={data} />}
          <QrImage value={slug} />
        </div>
        {data.attributes.sobre_mi != "" && <About info={data.attributes.sobre_mi} />}
        {data.attributes.botones.length > 0 && <ContactButtons contactButtons={data} />}
        {data.attributes.links.length > 0 && <Links linksList={data.attributes.links} />}
        {data.attributes.redes_sociales != null && <SocialLinks socialLinks={data.attributes.redes_sociales} />}
      </Wrapper>
      
      {/* <Footer/> */}
    </Layout>
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
