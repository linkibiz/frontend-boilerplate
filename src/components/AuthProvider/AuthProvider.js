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
    nombre_completo: "",
    id: null,
    sobre_mi: "",
    ocupacion: "",
    socialLinks: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      const data = response.data;
      setUserData({
        username: data.username,
        email: data.email,
        slug: data.slug,
        nombre_completo: data.nombre_completo,
        id: data.id,
        sobre_mi: "",
        ocupacion: "",
        socialLinks: {
          facebook: "",
          linkedin: "",
          twitter: "",
          instagram: "",
        },
      });
    } catch (error) {
      console.error(error);
      setError("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return <AuthContext.Provider value={{ userData, setUserData, isLoading, error }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
