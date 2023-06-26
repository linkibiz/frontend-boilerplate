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
    ocupacion: "",
    redes_sociales: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    }
  },
  setUserData: () => {},
});

// Create a hook for easy usage of the context
export const useAuthContext = () => useContext(AuthContext);

// Create a context provider component
export const AuthContextProvider = ({ children }) => {
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
    ocupacion: "",
    redes_sociales: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    }
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
