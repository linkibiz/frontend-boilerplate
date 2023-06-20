import { useState } from "react";
import useForm from "../hooks/useForm";
import axios from "axios";

const CreateProfile = ({ onSubmit, initialData = {}, userId }) => {
  const [values, handleChange] = useForm(initialData);
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const handleSocialLinksInputChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate slug
      const slug = values.nombre_completo.toLowerCase().replace(/\s+/g, "-");
      // Create profile with user relation
      const profileDataWithRelation = {
        ...values,
        user: userId,
        slug: `${slug}-${userId}`,
        redes_sociales: {
          facebook: `https://www.facebook.com/${socialLinks.facebook}`,
          linkedin: `https://www.linkedin.com/in/${socialLinks.linkedin}`,
          twitter: `twitter.com/${socialLinks.twitter}`,
          instagram: `https://www.instagram.com/${socialLinks.instagram}`,
        },
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles`, {
        data: profileDataWithRelation,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      onSubmit(response.data.data.id, `${slug}-${userId}`);
    } catch (error) {
      console.error("Error creating profile:", error.message);
    }
  };

  return (
    <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
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
                value={values.nombre_completo}
                onChange={handleChange}
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
              <textarea
                name="sobre_mi"
                rows="5"
                cols="33"
                value={values.sobre_mi}
                onChange={handleChange}
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
                value={socialLinks.facebook}
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
                value={socialLinks.instagram}
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
                value={socialLinks.twitter}
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
                value={socialLinks.linkedin}
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
