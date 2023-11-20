import { useContext, useState } from "react";
import { AuthContext, useAuthContext } from "@/context/auth-context";
import Layout from "@/components/Layout";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Signup from "@/components/Signup";
import CreateUser from "@/components/CreateUser";
import CreateProfile from "@/components/CreateProfile";
import CreateAvatar from "@/components/CreateAvatar";
import Image from "next/image";
import Logo from "../../public/images/linki-logo-black.png";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { userData } = useContext(AuthContext);
  const { updateUserData } = useAuthContext();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  };

  const handleFinalSubmit = () => {
    // Implement the final submission logic here using the userData
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Signup onNextStep={handleNext} />;
      case 1:
        return <CreateUser onNextStep={handleNext} onBack={handleBack} />;
      case 2:
        return <CreateProfile onNextStep={handleNext} onBack={handleBack} />;
      case 3:
        return <CreateAvatar onFinalSubmit={handleFinalSubmit} onBack={handleBack} />;
      default:
        return <div />;
    }
  };

  return (
    <Layout pageName="Sign up">
      <div className="mx-auto mb-3">
        <Image src={Logo} alt="linki logo" width={100} />
      </div>
      {/* <TransitionGroup> */}
      {/* <CSSTransition key={activeStep} timeout={500} classNames="fade"> */}
      {renderStep()}
      {/* </CSSTransition> */}
      {/* </TransitionGroup> */}
    </Layout>
  );
};

export default SignUp;
