import { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Logo from "../../public/images/linki-logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { setToken } from "@/utils/helpers";
import { useAuthContext } from "@/context/auth-context";
import { API } from "@/utils/constant";
import { useRouter } from "next/router";
import BackArrow from "@/components/Icons/BackArrow";
import SignUpHeading from "@/components/SignUpHeading";
import InputField from "@/components/InputField";
import LoadingSpinner from "@/components/LoadingSpinner";

const Login = () => {
  const { userData, setUserData } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/auth/local`, userData);

      const data = response.data;
      console.log(data);
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        console.log("data user", data.user);
        setUserData(data.user);

        localStorage.setItem("userData", JSON.stringify(data.user));
        const url = data.user.username;
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
    <Layout pageName={"Log in"}>
      <div className="mx-auto mb-3">
        <Image src={Logo} alt="linki logo" width={100} />
      </div>
      <div className="bg-white flex flex-col gap-3">
        <div className="h-4 w-4">
          <BackArrow />
        </div>
        <SignUpHeading title="Log in" subtitle="Ingrese su email y contraseña en los siguientes campos" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputField placeholder="Email" name="identifier" type="email" value={userData.identifier} onChange={handleUserInputChange} />
          <InputField name="password" placeholder="Password" type="password" value={userData.password} onChange={handleUserInputChange} />
          <button type="submit" disabled={isLoading} className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center">
            {isLoading ? <LoadingSpinner /> : "Continuar"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </Layout>
  );
};

export default Login;
