import React, {useEffect, useState} from "react";
import { Transition } from "react-transition-group";

const IconsModal = ({ icon, isOpen, closeModal, selectedPlatform, userData, handleSocialLinksInputChange }) => {
  
  const [inputError, setInputError] = useState("");

  const [inputValue, setInputValue] = useState(userData.redes_sociales?.[selectedPlatform.name] || "");
  useEffect(() => {
    setInputValue(userData.redes_sociales?.[selectedPlatform.name] || "")
  }, [selectedPlatform, userData]);

  const isValidInput = (input) => {
    return !/[@\s]/.test(input);
  };

  const validatedInput = (input) => {
    if (!isValidInput(input)) {
      setInputError("El usuario no debe contener espacios en blanco ni el símbolo '@'");
    } else {
      setInputError(""); // clear the error if username becomes valid
    }
  };

  const handleChange = (e) => {
    validatedInput(e.target.value)
    setInputValue(e.target.value);
    handleSocialLinksInputChange(e, selectedPlatform.name);
  }
  
  return (
    <Transition in={isOpen} timeout={200} unmountOnExit>
      {(state) => (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-200 ${
            state === "entering" || state === "entered" ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full max-w-[325px]">
            <span onClick={closeModal} className="absolute top-0 left-0 h-3 w-3 p-4 text-[10px] font-bold flex justify-center items-center rounded-full bg-white m-3">X</span>
            <div className="bg-black rounded-lg p-10">
              <div className="mb-4 flex gap-4 justify-between items-center flex-col">
                <div className="h-[88px]">{icon}</div>

                <h2 className="text-white capitalize ">{selectedPlatform.name}</h2>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="border p-2 w-full "
                placeholder={`Usuario de ${selectedPlatform.name}`}
              />
              {inputError && <div className="text-red-500 mt-1">{inputError}</div>}
              <div style={{
                display: inputError ? "none" : "block",
              }} onClick={closeModal} className="w-full mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
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
