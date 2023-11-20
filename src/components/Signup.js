import React, { useState } from "react";
import Image from "next/image";
import WelcomeBanner from "./WelcomeBanner";
import InputField from "./InputField";
import BackArrow from "./Icons/BackArrow";
import Layout from "./Layout";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import SignUpHeading from "./SignUpHeading";

const Signup = ({ onNextStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUserData } = useAuthContext();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleContinue = () => {
    updateUserData({ email, password });
    onNextStep();
  };

  return (
    <div className="bg-white flex flex-col gap-3">
      <div className="h-4 w-4">
        <BackArrow />
      </div>
      <SignUpHeading title="Sign up" subtitle="Ingrese su email y contraseña en los siguientes campos" />
      <div className="flex flex-col gap-2">
        <InputField label="Email" placeholder="Email" name="email" type="email" value={email} onChange={handleEmailChange} />
        <InputField
          label="Contraseña"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleContinue} className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center">
        Continuar
      </button>
    </div>
  );
};

export default Signup;
