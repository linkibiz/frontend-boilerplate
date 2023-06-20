import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [profileData, setProfileData] = useState({
    nombre_completo: "",
    sobre_mi: "",
    slug: "cristhian-v",
  });

  return (
    <AuthContext.Provider value={{userData, setUserData, profileData, setProfileData}}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;