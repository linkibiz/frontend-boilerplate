import { createContext, useContext, useState } from "react";

// Create initial context object
export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  userData: {
    username: "",
    email: "",
    identifier: "",
    password: "",
    password_confirmation: "",
    slug: "",
    nombre_completo: ""
  },
  profileData: {
    sobre_mi: "",
  },
  setUserData: () => {},
  setProfileData: () => {},
});

// Create a hook for easy usage of the context
export const useAuthContext = () => useContext(AuthContext);
// Create a context provider component
export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    identifier: "",
    slug: "",
    nombre_completo: ""
  });

  const [profileData, setProfileData] = useState({
    sobre_mi: "",
  });

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, userData, setUserData, profileData, setProfileData }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;