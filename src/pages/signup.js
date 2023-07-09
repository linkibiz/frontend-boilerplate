import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import Layout from "@/components/Layout";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
import CreateUser from "@/components/CreateUser";
import CreateAvatar from "@/components/CreateAvatar";
import CreateProfile from "@/components/CreateProfile";
import WelcomeScreen from "@/components/WelcomeScreen";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [userId, setUserId] = useState();
  const { userData } = useContext(AuthContext); // use AuthContext

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

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <WelcomeScreen onSubmit={handleUserSubmit} />;
      case 1:
        return <CreateUser onSubmit={handleUserSubmit} />;
      case 2:
        return <CreateProfile onSubmit={handleProfileSubmit} userId={userId} />;
      case 3:
        return <CreateAvatar onSubmit={handleImageSubmit} perfilId={profileID} slug={slug} />;
      default:
        return <div />;
    }
  };

  return (
    <Layout pageName="Sign up">
      <>
        <div className=" bg-black flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
          <div className=" w-[125px]">
            <Link href="/">
              <Image src={Logo} />
            </Link>
          </div>
        </div>
        <TransitionGroup>
          <CSSTransition key={activeStep} timeout={500} classNames="fade">
            {renderStep()}
          </CSSTransition>
        </TransitionGroup>
      </>
    </Layout>
  );
};

export default SignUp;
