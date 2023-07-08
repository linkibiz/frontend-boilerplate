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
    redes_sociales: {
      facebook: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      website: "",
      tiktok: "",
      youtube: "",
      whatsapp: "",
      email: ""
    },
    links: [
    ],
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authToken = getToken();

  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/users/me?populate=deep`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      const data = response.data;
      const profile = response.data.user;
      setUserData({
        username: data.username,
        email: data.email,
        slug: data.username,
        id: data.id,
        nombre_completo: data?.nombre_completo,
        sobre_mi: profile?.sobre_mi || "",
        ocupacion: profile?.ocupacion || "",
        avatar: {
          ...profile?.avatar,
          url: profile?.avatar.url,
        },
        // banner: {
        //   ...profile?.banner,
        //   url: profile?.banner.url
        // },
        redes_sociales: {
          facebook: profile?.redes_sociales.facebook || "",
          linkedin: profile?.redes_sociales.linkedin || "",
          twitter: profile?.redes_sociales.twitter || "",
          instagram: profile?.redes_sociales.instagram || "",
          website: profile?.redes_sociales.website || "",
          tiktok: profile?.redes_sociales.tiktok || "",
          youtube: profile?.redes_sociales.youtube || "",
          whatsapp: profile?.redes_sociales.whatsapp || "",
          email: profile?.redes_sociales.email || ""
        },
        links: profile?.links || [],
        botones: profile?.botones || [],
        vcard: {
          nombre: "",
          apellido: "",
          ocupacion: "",
          email: "",
          celular: "",
          website: "",
          telefono_casa: "",
          telefono_trabajo: "",
          email_trabajo: ""
        }
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

  return <AuthContext.Provider value={{ userData, setUserData, isLoading, setIsLoading, error }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
