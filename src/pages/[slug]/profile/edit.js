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
  const [isLoading, setLoading] = useState(true);
  const { userData, setUserData } = useAuthContext();
  const [error, setError] = useState("");
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSocialLinksInputChange = (e) => {
    setUserData({
      ...userData,
      redes_sociales: {
        ...userData.redes_sociales,
        [e.target.name]: e.target.value,
      },
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        console.log("loading1", isLoading)
        const response = await axios.get(`${API}/profiles?filters[slug][$eq]=${slug}&populate=deep`);
        if (response.data.data[0].id !== userData.id) {
          router.push(`/${userData.username}`);
        } else {
          console.log("loading2", isLoading)
          setProfileID(response.data.data[0].id);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
      }
    };

    if (userData.id) {
      fetchUser();
    }
  }, [userData.id, slug, router, userData.username]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Get the current state of the resource
      const getResponse = await axios.get(`${API}/profiles/${profileID}?populate=deep`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const currentData = getResponse.data.data.attributes;
      // Merge the current state with the updates
      const updatedData = { ...currentData, ...userData };
      // Make the PUT request
      const putResponse = await axios.put(
        `${API}/profiles/${profileID}`,
        { data: updatedData },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const data = putResponse.data;
      setUserData(data);
      router.push(`/${slug}`);
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
        {!isLoading ? (
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
              <div className="mt-4">
                <label htmlFor="sobre_mi" className="block text-sm font-medium text-white">
                  Sobre Mí:
                </label>
                <div className="flex flex-col items-start">
                  <textarea
                    name="sobre_mi"
                    rows="5"
                    cols="33"
                    value={userData.sobre_mi}
                    onChange={handleUserInputChange}
                    className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="ocupacion" className="block text-sm font-medium text-white">
                  Ocupacion
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="ocupacion"
                    value={userData.ocupacion}
                    onChange={handleUserInputChange}
                    className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className=" text-white my-3 font-bold">Redes sociales</h3>
                <label htmlFor="facebook" className="block text-sm font-medium text-white">
                  Facebook
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="facebook"
                    value={userData.redes_sociales?.facebook || ""}
                    onChange={handleSocialLinksInputChange}
                    className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <label htmlFor="facebook" className="block text-sm font-medium text-white">
                  Instagram
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="instagram"
                    value={userData.redes_sociales?.instagram || ""}
                    onChange={handleSocialLinksInputChange}
                    className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <label htmlFor="twitter" className="block text-sm font-medium text-white">
                  Twitter
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="twitter"
                    value={userData.redes_sociales?.twitter || ""}
                    onChange={handleSocialLinksInputChange}
                    className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-white">
                  Linkedin
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="linkedin"
                    value={userData.redes_sociales?.linkedin || ""}
                    onChange={handleSocialLinksInputChange}
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
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(ProfileEdit);
