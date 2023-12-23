import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";

const IconsModal = ({ IconComponent, isOpen, closeModal, selectedPlatform, userData, handleSocialLinksInputChange, placeholder }) => {
  const [inputError, setInputError] = useState("");
  const [inputValue, setInputValue] = useState(userData.redes_sociales?.[selectedPlatform.name] || "");
  useEffect(() => {
    setInputValue(userData.redes_sociales?.[selectedPlatform.name] || "");
  }, [selectedPlatform, userData]);

  const isValidInput = (input) => {
    // Validación existente: no debe contener espacios ni el símbolo '@'
    const hasInvalidChars = /[@\s]/.test(input);

    // Nueva validación: no debe contener elementos típicos de una URL
    // Nota: (?: ... ) es un grupo no capturador en regex
    const isURL = /(?:http:\/\/|https:\/\/|www\.|)(instagram|facebook|linkedin|pinterest|twitter|youtube)\.com\//.test(input);

    // Si tiene caracteres no válidos o es una URL, entonces no es una entrada válida
    return !hasInvalidChars && !isURL;
  };

  const validatedInput = (input) => {
    if (!isValidInput(input)) {
      setInputError("Introducir solo el usuario, este no debe contener espacios en blancos ni caracteres especiales como el '@' o '/'");
    } else {
      setInputError(""); // clear the error if username becomes valid
    }
  };

  const handleChange = (e) => {
    validatedInput(e.target.value);
    setInputValue(e.target.value);
    handleSocialLinksInputChange(e.target.value, selectedPlatform.name);
  };

  return (
    <Transition in={isOpen} timeout={200} unmountOnExit>
      {(state) => (
        <div
          className={`z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-200 ${
            state === "entering" || state === "entered" ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full max-w-[325px]">
            <span
              onClick={closeModal}
              className="absolute top-0 left-0 h-3 w-3 p-4 text-[10px] font-bold flex justify-center items-center rounded-full bg-white m-3"
            >
              X
            </span>
            <div className="bg-[#F3F4F6] rounded-lg p-10">
              <div className="mb-4 flex gap-4 justify-between items-center flex-col">
                <div className="h-[88px]">
                  <IconComponent />
                </div>

                <h2 className="text-black capitalize font-bold">{selectedPlatform.name}</h2>
              </div>
              <input type="text" value={inputValue} onChange={handleChange} className="border p-2 w-full " placeholder={selectedPlatform.placeholder} />
              {inputError && <div className="text-red-500 mt-1 text-sm">{inputError}</div>}
              <div
                style={{
                  display: inputError ? "none" : "block",
                }}
                onClick={closeModal}
                className="py-4 px-5 mt-5 w-full bg-black text-white rounded-lg font-bold text-center"
              >
                Guardar
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default IconsModal;
