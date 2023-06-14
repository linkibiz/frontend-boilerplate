import { useState } from "react";
import Layout from "@/components/Layout";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
import CreateUser from "@/components/CreateUser";
import CreateAvatar from "@/components/CreateAvatar";
import CreateProfile from "@/components/CreateProfile";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState();

  const userData = {
    username: "",
    email: "",
    password: "",
  };

  const profileData = {
    nombre_completo: "",
    sobre_mi: "",
    slug: "",
  };

  const [profileID, setProfileID] = useState();
  const [slug, setSlug] = useState();

  const handleUserSubmit = (userId) => {
    setUserId(userId);
    handleNext();
  };

  const handleProfileSubmit = (profileID, slug) => {
    setProfileID(profileID);
    setSlug(slug);
    handleNext();
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleImageSubmit = () => {
    handleNext();
  };

  return (
    <Layout pageName="Sign up">
      <>
        <div className=" bg-black flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
          <div className=" w-[200px]">
            <Link href="/">
              <Image src={Logo} />
            </Link>
          </div>
        </div>
        {activeStep === 0 && <CreateUser initialData={userData} onSubmit={handleUserSubmit} />}
        {activeStep === 1 && <CreateProfile initialData={profileData} onSubmit={handleProfileSubmit} userId={userId} />}
        {activeStep === 2 && <CreateAvatar  onSubmit={handleImageSubmit} perfilId={profileID} slug={slug} />}
      </>
    </Layout>
  );
};

export default SignUp;
