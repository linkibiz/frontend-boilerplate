import React, { useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { API, BEARER } from "@/utils/constant";
import { useEffect } from "react";
import { getToken } from "@/utils/helpers";
import axios from "axios";
const AuthProvider = ({ children }) => {
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

  const [isLoading, setIsLoading] = useState(false);

  const authToken = getToken();
  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      const data = response.data;
      console.log(data);

      setUserData({
        username: data.username,
        email: data.email,
        slug: data.slug,
        nombre_completo: data.nombre_completo
        // if the password fields are returned you can add them here,
        // typically for security reasons password is not returned in APIs
      });

     
    } catch (error) {
      console.error(error);
      console.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return <AuthContext.Provider value={{ userData, setUserData, profileData, setProfileData, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
