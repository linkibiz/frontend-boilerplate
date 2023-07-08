import { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Logo from "../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
import { setToken } from "@/utils/helpers";
import { useAuthContext } from "@/context/auth-context";
import { API } from "@/utils/constant";
import { useRouter } from "next/router";

const Login = () => {
  const {userData, setUserData } = useAuthContext();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/auth/local`, userData)

      const data = response.data;
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUserData(data.user);
        const url = data.user.username
        router.push(`/${url}/profile/edit`);
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <Layout pageName="Log in">
      <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className=" w-[200px]">
          <Link href="/">
            <Image src={Logo} />
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="identifier"
                  value={userData.identifier}
                  onChange={handleUserInputChange}
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
                  className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4 flex-col gap-3">
              <Link className="text-sm text-white underline hover:text-gray-900" href="/signup">
                Create your account
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
