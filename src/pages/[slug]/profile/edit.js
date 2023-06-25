import withAuth from "@/components/withAuth";
import Layout from "@/components/Layout";
import Logo from "../../../../public/images/linki-logo.png";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import { useState, useEffect } from "react";
import { getToken } from "@/utils/helpers";
import axios from "axios";
import { useRouter } from "next/router";
import { API } from "@/utils/constant";
const ProfileEdit = () => {
  const [profileID, setProfileID] = useState();
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useAuthContext();
  const [error, setError] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/users/${userData.id}?populate=deep`);
        setProfileID(response.data.profile.id);
      } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
      }
    };

    if (userData.id) {
      fetchUser();
    }
  }, [userData.id]);

  console.log("user", profileID);
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Get the current state of the resource
      const getResponse = await axios.get(`${API}/profiles/${profileID}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const currentData = getResponse.data.data;
      console.log(currentData)
      // Merge the current state with the updates
      const updatedData = { ...currentData.attributes, ...userData };
      console.log(updatedData)
      // // Make the PUT request
      // const putResponse = await axios.put(`${API}/profiles/${profileID}`, {data: updatedData}, {
      //   headers: {
      //     Authorization: `Bearer ${getToken()}`,
      //   },
      // });

      // const data = putResponse.data;
      // console.log(data)
      // setUserData(data);
      // router.push(`/${slug}`);
    } catch (error) {
      console.error(error);
      setError("Error while updating profile data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout pageName={`${slug} - Edit`}>
      <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        <div className=" w-[200px]">
          <Link href="/">
            <Image src={Logo} />
          </Link>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleProfileUpdate}>
            <div className="mt-4">
              <label htmlFor="text" className="block text-sm font-medium text-white">
                Nombre completo
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="nombre_completo"
                  value={userData?.nombre_completo}
                  onChange={handleUserInputChange}
                  className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4 flex-col gap-3">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900"
              >
                Cambiar datos
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
