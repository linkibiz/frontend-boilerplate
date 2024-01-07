import { BEARER } from "@/utils/constant";
import axios from "axios";

export const fetchLoggedInUser = async (token) => {
  if (!token) {
    setError("No authentication token found.");
    return;
  }

  setIsLoading(true);
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=deep`, {
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
