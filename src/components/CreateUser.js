import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/auth-context";
import { setToken } from "@/utils/helpers";

const CreateUser = ({ onSubmit, initialData = {} }) => {
  const { userData, setUserData } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, userData);
      const data = response.data;
      if (data?.error) {
        throw data?.error;
      } else {
        const slug = data.user.username;
        // setToken(data.jwt);

        setUserData(data.user);

        onSubmit(data.user.id, slug);
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Aquí va tu formulario de registro de usuario
    <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
      <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre_completo" className="block text-sm font-medium text-white">
              Nombre y Apellido:
            </label>
            <div className="flex flex-col items-start">
              <input
                type="text"
                name="nombre_completo"
                value={userData.nombre_completo}
                onChange={handleUserInputChange}
                required
                className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Usuario
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
              Contraseña
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
              Confirmar Contraseña
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password_confirmation"
                value={userData.password_confirmation}
                onChange={handleUserInputChange}
                required
                className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-4 flex-col gap-3">
            <a className="text-sm text-white underline hover:text-gray-900" href="#">
              ¿Ya tienes cuenta?
            </a>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-transparent rounded-md active:bg-gray-900"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
