import { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

const SignUp = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profileData, setProfileData] = useState({
    nombre_completo: "",
    sobre_mi: "",
    slug: "",
  });

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleProfileInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeStep === 0) {
        // Create user
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, userData);

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        setUserId(response.data.user.id)
        console.log("User created:", response.data);
        handleNext();
      } else if (activeStep === 1) {
        // Generate slug
        const slug = profileData.nombre_completo.toLowerCase().replace(/\s+/g, "-");

        // Create profile with user relation
        const profileDataWithRelation = {
          ...profileData,
          user: userId,
          slug,
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles`, {
          data: profileDataWithRelation,
        });

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        router.push(`/${encodeURIComponent(slug)}/perfil`);
      }
    } catch (error) {
      console.error("Error creating user and profile:", error.message);
    }
  };

  return (
    <Layout pageName="Sign up">
      <>
        {activeStep === 0 && (
          <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
            <div className=" w-[200px]">
              <Link href="/">
                <Image src={Logo} />
              </Link>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Username
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleUserInputChange}
                      required
                      className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleUserInputChange}
                      required
                      className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleUserInputChange}
                      required
                      className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-white">
                    Confirm Password
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="password"
                      name="password_confirmation"
                      className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4 flex-col gap-3">
                  <a className="text-sm text-white underline hover:text-gray-900" href="#">
                    Already registered?
                  </a>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
            <div className=" w-[200px]">
              <Link href="/">
                <Image src={Logo} />
              </Link>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="nombre_completo" className="block text-sm font-medium text-white">
                    Nombre Completo:
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="nombre_completo"
                      value={profileData.nombre_completo}
                      onChange={handleProfileInputChange}
                      required
                      className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="sobre_mi" className="block text-sm font-medium text-white">
                    Sobre Mí:
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="sobre_mi"
                      value={profileData.sobre_mi}
                      onChange={handleProfileInputChange}
                      required
                      className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4 flex-col gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900"
                  >
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h2>Profile Created!</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Nombre Completo: {profileData.nombre_completo}</p>
            <p>Sobre Mí: {profileData.sobre_mi}</p>
            {/* Display other profile data */}
          </div>
        )}
      </>
    </Layout>
  );
};

export default SignUp;
