import { useState } from "react";

const useSignupState = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    identifier: "",
    slug: "",
    nombre_completo: "",
    id: null,
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
    }
  });

  const handleSignupChange = (e) => {
    console.log(e.target.value)
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return { signupData, setSignupData, handleSignupChange };
};

export default useSignupState;
