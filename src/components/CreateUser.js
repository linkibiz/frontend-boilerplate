import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/auth-context";
import { setToken } from "@/utils/helpers";
import LoadingSpinner from "./LoadingSpinner";
import InputField from "./InputField";

const CreateUser = ({ onSubmit, initialData = {} }) => {
  const { userData, setUserData } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isValidUsername = (username) => {
    return !/[@\s]/.test(username);
  };

  const validateUsernameOnInput = (username) => {
    if (!isValidUsername(username)) {
      setUsernameError("El nombre de usuario no debe contener espacios en blanco ni el símbolo '@'");
    } else {
      setUsernameError(""); // clear the error if username becomes valid
    }
  };

  const validatePasswordMatch = () => {
    if (userData.password !== userData.password_confirmation) {
      setPasswordError("Las contraseñas no coinciden");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // validate username if the input changed is username
    if (name === "username") {
      validateUsernameOnInput(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    if (usernameError) {
      setIsLoading(false);
      return;
    }

    if (!validatePasswordMatch()) {
      setIsLoading(false);
      return;
    }

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
      setError("Nombre de usuario ya existe, intente con otro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Aquí va tu formulario de registro de usuario
    <div className=" bg-black flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
      <div className="w-full px-6 py-4 mt-6 overflow-hidden sm:max-w-md sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Nombre y Apellido:"
            name="nombre_completo"
            type="text"
            value={userData.nombre_completo}
            onChange={handleUserInputChange}
          />

          <InputField
            label="Usuario"
            name="username"
            type="text"
            value={userData.username}
            onChange={handleUserInputChange}
            errorMessage={usernameError}
          />

          <InputField label="Email" name="email" type="email" value={userData.email} onChange={handleUserInputChange} />

          <InputField label="Contraseña" name="password" type="password" value={userData.password} onChange={handleUserInputChange} />

          <InputField
            label="Confirmar Contraseña"
            name="password_confirmation"
            type="password"
            value={userData.password_confirmation}
            onChange={handleUserInputChange}
            errorMessage={passwordError}
          />
          <div className="flex items-center justify-end mt-4 flex-col gap-3">
            {/* <a className="text-sm text-white underline hover:text-gray-900" href="#">
              ¿Ya tienes cuenta?
            </a> */}
            <button
              type="submit"
              className="w-full max-w-[250px] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {isLoading ? <LoadingSpinner /> : "Siguiente"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
