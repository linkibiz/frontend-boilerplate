import { useRef, useState } from "react";
import axios from "axios";
import { useAuthContext } from "@/context/auth-context";
import { setToken } from "@/utils/helpers";
import LoadingSpinner from "./LoadingSpinner";
import InputField from "./InputField";
import SignUpHeading from "./SignUpHeading";
import BackArrow from "./Icons/BackArrow";
import ProfileRounded from "./Icons/ProfileRounded";

const CreateUser = ({ onSubmit, initialData = {}, onNextStep, onBack }) => {
  const { updateUserData, userData, setUserData } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const fileInputRef = useRef(null);

  const [previewUrl, setPreviewUrl] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setSelectedImage(img);
      setPreviewUrl(URL.createObjectURL(img));
    }
  };

  const triggerFileSelectPopup = () => fileInputRef.current.click();

  const isValidUsername = (username) => {
    return !/[@\s]/.test(username);
  };

  console.log(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field belongs to the 'vcard' object
    if (name in userData.vcard) {
      updateUserData({
        vcard: {
          ...userData.vcard,
          [name]: value,
        },
      });
    } else {
      updateUserData({ [name]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      // Assuming there are 3 steps (0, 1, 2)
      setCurrentStep(currentStep + 1);
    } else {
      onNextStep(); // Move to the next major step or finalize the signup process
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBack(); // Go back to the Signup step
    } else {
      setCurrentStep(currentStep - 1); // Go back to the previous step within CreateUser
    }
  };

  const validateUsernameOnInput = (username) => {
    if (!isValidUsername(username)) {
      setUsernameError("El nombre de usuario no debe contener espacios en blanco ni el símbolo '@'");
    } else {
      setUsernameError(""); // clear the error if username becomes valid
    }
  };

  // const validatePasswordMatch = () => {
  //   if (userData.password !== userData.password_confirmation) {
  //     setPasswordError("Las contraseñas no coinciden");
  //     return false;
  //   } else {
  //     setPasswordError("");
  //     return true;
  //   }
  // };

  // const handleUserInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  //   // validate username if the input changed is username
  //   if (name === "username") {
  //     validateUsernameOnInput(value);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setIsLoading(true);
  //   if (usernameError) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (!validatePasswordMatch()) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, userData);
  //     const data = response.data;
  //     if (data?.error) {
  //       throw data?.error;
  //     } else {
  //       const slug = data.user.username;
  //       // setToken(data.jwt);

  //       setUserData(data.user);

  //       onSubmit(data.user.id, slug);
  //     }
  //   } catch (error) {
  //     setError("Nombre de usuario ya existe, intente con otro");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <SignUpHeading title="¿Cual es su nombre?" subtitle="Nombre completo para mostrar en su perfíl" />
            <InputField
              label="What's your name?"
              name="nombre_completo"
              type="text"
              value={userData.nombre_completo || ""}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
            <button className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center" onClick={handleNext}>
              Continuar
            </button>
          </>
        );
      case 1:
        return (
          <>
            <SignUpHeading
              title="Ocupación"
              subtitle="Si no eres parte de una empresa, puedes ser creativo con tu puesto de trabajo/empresa"
            />
            <InputField
              placeholder="Ocupación"
              label="Company info?"
              name="ocupacion"
              type="text"
              value={userData.ocupacion || ""}
              onChange={handleInputChange}
            />
            <button className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center" onClick={handleNext}>
              Continuar
            </button>
          </>
        );
      case 2:
        return (
          <>
            <SignUpHeading
              title="Numero de contacto"
              subtitle="Añade tu número de teléfono con prefijo para que otros puedan llamarte o enviarte mensajes de texto."
            />
            <InputField
              label="Phone number?"
              name="celular"
              type="number"
              value={userData.vcard?.celular || ""}
              onChange={handleInputChange}
              placeholder="Numero de contacto"
            />
            <button className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center" onClick={handleNext}>
              Continuar
            </button>
          </>
        );
      case 3:
        return (
          <>
            <SignUpHeading title="¡Sube tu foto de perfil!" subtitle="Las fotos hacen que tu perfil sea más atractivo." />
            <div className="flex flex-col gap-4 mt-7">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              {selectedImage ? (
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="mt-2 h-[200px] w-[200px] rounded-full m-auto border-black border object-cover"
                  onClick={triggerFileSelectPopup}
                />
              ) : (
                // Placeholder image
                <div className="h-[150px]" onClick={triggerFileSelectPopup}>
                  <ProfileRounded />
                </div>
              )}
            </div>
            <button className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center" onClick={handleNext}>
              Continuar
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    // Aquí va tu formulario de registro de usuario
    <>
      <div className="h-4 w-4" onClick={handleBack}>
        <BackArrow />
      </div>
      <div className="mt-4">{renderStepContent()}</div>
    </>
  );
};

export default CreateUser;
