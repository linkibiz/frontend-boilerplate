import { createContext, useContext, useState } from "react";

// Create initial context object
export const AuthContext = createContext({
  isLoading: false,
  error: null,
  userData: {
    username: "",
    email: "",
    identifier: "",
    password: "",
    password_confirmation: "",
    slug: "",
    nombre_completo: "",
    sobre_mi: "",
    redes_sociales: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      website: "",
      tiktok: "",
      youtube: "",
      whatsapp: "",
      email: "",
    },
    links: [],
    botones: [],
    vcard: {
      nombre: "",
      apellido: "",
      ocupacion: "",
      email: "",
      celular: "",
      website: "",
      telefono_casa: "",
      telefono_trabajo: "",
      email_trabajo: "",
    },
  },
  setUserData: () => {},
});

// Create a hook for easy usage of the context
export const useAuthContext = () => useContext(AuthContext);

// Create a context provider component
const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    identifier: "",
    slug: "",
    nombre_completo: "",
    sobre_mi: "",
    redes_sociales: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      website: "",
      tiktok: "",
      youtube: "",
      whatsapp: "",
      email: "",
    },
    links: [],
    botones: [],
    vcard: {
      nombre: "",
      apellido: "",
      ocupacion: "",
      email: "",
      celular: "",
      website: "",
      telefono_casa: "",
      telefono_trabajo: "",
      email_trabajo: "",
    },
  });

  const contextValue = {
    isLoading,
    setIsLoading,
    error,
    setError,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
