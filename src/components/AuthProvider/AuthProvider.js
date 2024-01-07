import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AUTH_TOKEN, API, BEARER } from "@/utils/constant";
import { getToken } from "@/utils/helpers";
import axios from "axios";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const initialUserData = {
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
    contact_buttons: {
      email: "",
      phone: "",
      whatsapp: "",
      website: "",
    },
    ocupacion: "",
    vcard: {
      nombre: "",
      apellido: "",
      // ocupacion: "",
      email: "",
      celular: "",
      website: "",
      telefono_casa: "",
      telefono_trabajo: "",
      email_trabajo: "",
    },
  };

  const [userData, setUserData] = useState(initialUserData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authToken = getToken();

  const updateUserData = (newData) => {
    setUserData((currentData) => ({ ...currentData, ...newData }));
  };

  const updateVCardWithUserInfo = useCallback(() => {
    const fullNameParts = userData.nombre_completo.split(" ");
    const firstName = fullNameParts[0];
    const lastName = fullNameParts.length > 1 ? fullNameParts.slice(1).join(" ") : "";

    setUserData((currentData) => ({
      ...currentData,
      vcard: {
        ...currentData.vcard,
        nombre: firstName,
        apellido: lastName,
        email: currentData.email,
      },
    }));
  }, [userData.nombre_completo, setUserData]);

  const fetchLoggedInUser = async (token) => {
    console.log("fetcheando data de usuario");
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/users/me?populate=deep`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });

      const { username, email, id, user: profile } = response.data;

      // Default values can be provided directly in the destructuring.
      const redes_sociales = {
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        website: "",
        tiktok: "",
        youtube: "",
        whatsapp: "",
        email: "",
        ...profile.redes_sociales,
      };

      const contact_buttons = {
        email: "",
        phone: "",
        whatsapp: "",
        website: "",
        ...profile.contact_buttons,
      };

      setUserData({
        username,
        email,
        slug: username,
        id,
        nombre_completo: profile?.nombre_completo || "",
        sobre_mi: profile?.sobre_mi || "",
        avatar: profile?.avatar?.url || "",
        redes_sociales,
        ocupacion: profile?.ocupacion || "",
        links: profile?.links || [],
        contact_buttons,
        botones: profile?.botones || [],
        vcard: {
          nombre: profile?.vcard?.nombre || "",
          apellido: profile?.vcard?.apellido || "",
          email: profile?.vcard?.email || "",
          celular: profile?.vcard?.celular || "",
          website: profile?.vcard?.website || "",
          telefono_casa: profile?.vcard?.telefono_casa || "",
          telefono_trabajo: profile?.vcard?.telefono_trabajo || "",
          email_trabajo: profile?.vcard?.email_trabajo || "",
        },
      });
    } catch (error) {
      console.error("Error fetching logged-in user details:", error);
      setError("Unable to load user details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      console.log("useffect para fecthLoggedInUser");
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  // Proporciona valores y funciones a través del contexto
  const contextValue = {
    userData,
    setUserData,
    updateUserData,
    updateVCardWithUserInfo,
    isLoading,
    setIsLoading,
    error,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
