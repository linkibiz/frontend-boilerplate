import React, { useState } from "react";
import Image from "next/image";
import WelcomeBanner from "./WelcomeBanner";
import InputField from "./InputField";
import BackArrow from "./Icons/BackArrow";
import Layout from "./Layout";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import SignUpHeading from "./SignUpHeading";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const Signup = ({ onNextStep, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateUserData } = useAuthContext();
  const [usernameError, setUsernameError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUserChange = (e) => setUsername(e.target.value);

  const isValidUsername = (username) => {
    return !/[@\s]/.test(username);
  };

  const validateUsernameOnInput = (username) => {
    if (!isValidUsername(username)) {
      setUsernameError("El nombre de usuario no debe contener espacios en blanco ni el símbolo '@'");
    } else {
      setUsernameError(""); // clear the error if username becomes valid
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, {
        email,
        password,
        username,
      });

      const userData = response.data;
      if (userData.error) {
        throw new Error(userData.error);
      } else {
        updateUserData({ email: userData.user.email, username: userData.user.username, user: userData.user });
        onSubmit(userData.user.id)
        onNextStep();
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-3">
      <div className="h-4 w-4">
        <BackArrow />
      </div>
      <SignUpHeading title="Sign up" subtitle="Ingrese su email y contraseña en los siguientes campos" />
      <form onSubmit={handleContinue} className="flex flex-col gap-2">
        <InputField
          label="Usuario"
          placeholder="Usuario"
          name="username"
          type="text"
          value={username}
          onChange={handleUserChange}
          errorMessage={usernameError}
        />
        <InputField label="Email" placeholder="Email" name="email" type="email" value={email} onChange={handleEmailChange} />
        <InputField
          label="Contraseña"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" disabled={isLoading} className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center">
          {isLoading ? <LoadingSpinner /> : "Continuar"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Signup;
