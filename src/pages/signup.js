import { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: name, // Assuming 'name' is the field for username in Strapi
      email,
      password,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, userData);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      console.log('User created:', response.data);

      const userId = response.data.user.id;

      // Create profile object
      const profileData = {
        user: userId, // Link the profile to the newly created user
        // Add other profile fields here
      };

      // Make a POST request to create the profile
      const profileResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles`, profileData);

      if (profileResponse.status !== 200) {
        throw new Error(profileResponse.data.message);
      }

      console.log('Profile created:', profileResponse.data);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating user and profile:', error.message);
    }
  };

  return (
    <Layout pageName="Sign up">
      <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className=" w-[200px]">
          <a href="/">
            <Image src={Logo} />
          </a>
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
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
    </Layout>
  );
};

export default SignUp;
