import Congratulations from "@/components/Congratulations";
import CreateUser from "@/components/CreateUser";
import Layout from "@/components/Layout";
import Signup from "@/components/Signup";
import Image from "next/image";
import { useContext, useState } from "react";
import Logo from "../../public/images/linki-logo-black.png";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState();
  const [slug, setSlug] = useState();
  const [error, setError] = useState("");

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  };

  const handleProfileSubmit = (slug) => {
    setSlug(slug);
  };

  const handleEmailExistsError = () => {
    setActiveStep(0);
    setError("Correo ya existe, intente con otro");
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Signup onNextStep={handleNext} onSubmit={setUserId} error={error} />;
      case 1:
        return (
          <CreateUser
            onNextStep={handleNext}
            onBack={handleBack}
            userId={userId}
            onSubmit={handleProfileSubmit}
            handleEmailExistsError={handleEmailExistsError}
          />
        );
      case 2:
        return <Congratulations slug={slug} />;
      default:
        return <div />;
    }
  };

  return (
    <Layout pageName="Sign up">
      <div className="mx-auto mb-3">
        <Image src={Logo} alt="linki logo" width={100} />
      </div>
      {renderStep()}
    </Layout>
  );
};

export default SignUp;
