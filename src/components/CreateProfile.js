import { useContext, useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";
import { AuthContext } from "@/context/auth-context";
import { getToken } from "@/utils/helpers";
const CreateProfile = ({ onSubmit, userId }) => {
  const { userData, setUserData } = useContext(AuthContext);
  console.log("userData", userData);
  const authToken = getToken();
  const handleProfileInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  console.log(userData);
  const handleSocialLinksInputChange = (e) => {
    setUserData({
      ...userData,
      socialLinks: {
        ...userData.socialLinks,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        ...userData,
        user: userId,
        slug: userData.username,
        redes_sociales: {
          facebook: `https://www.facebook.com/${userData.socialLinks.facebook}`,
          linkedin: `https://www.linkedin.com/in/${userData.socialLinks.linkedin}`,
          twitter: `twitter.com/${userData.socialLinks.twitter}`,
          instagram: `https://www.instagram.com/${userData.socialLinks.instagram}`,
        },
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles`, { data: updatedUserData });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      // Updating the userData in the context
      setUserData(updatedUserData);
      console.log(response.data.data.attributes.slug);
      onSubmit(response.data.data.id, response.data.data.attributes.slug);
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };

  return (
    <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
      <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
        <form onSubmit={handleSubmit}>
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
                onChange={handleProfileInputChange}
                required
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
                onChange={handleProfileInputChange}
                required
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
                value={userData.socialLinks?.facebook || ""}
                onChange={handleSocialLinksInputChange}
                required
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
                value={userData.socialLinks?.instagram || ""}
                onChange={handleSocialLinksInputChange}
                required
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
                value={userData.socialLinks?.twitter || ""}
                onChange={handleSocialLinksInputChange}
                required
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
                value={userData.socialLinks?.linkedin || ""}
                onChange={handleSocialLinksInputChange}
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
