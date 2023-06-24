import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
const CreateAvatar = ({ onSubmit, perfilId, slug }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const router = useRouter();
  console.log(slug)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("files", selectedImage);
      formData.append("ref", "plugin::users-permissions.user"); // La entidad a la que se asocia la imagen
      formData.append("refId", perfilId); // The user ID to associate the image with
      formData.append("field", "avatar");
      const response = await axios.post("http://localhost:1337/api/upload", formData);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      onSubmit();
      router.push(`/${slug}`);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  return (
    <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
      <form onSubmit={handleSubmit} className=" w-[250px] flex flex-col justify-center gap-7">
        <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
          ¡Sube tu foto de perfil!
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image"
          onChange={handleImageChange}
        />

        {previewUrl && <img src={previewUrl} />}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900"
        >
          Crear perfil
        </button>
      </form>
    </div>
  );
};

export default CreateAvatar;
