import React, {useEffect, useState} from "react";
import { Transition } from "react-transition-group";

const IconsModal = ({ icon, isOpen, closeModal, selectedPlatform, userData, handleSocialLinksInputChange }) => {
  
  const [inputValue, setInputValue] = useState(userData.redes_sociales?.[selectedPlatform.name] || "");
  useEffect(() => {
    setInputValue(userData.redes_sociales?.[selectedPlatform.name] || "")
  }, [selectedPlatform, userData]);

  const handleChange = (e) => {
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
                placeholder={`${selectedPlatform.name} username`}
              />
              <div onClick={closeModal} className="mt-4 bg-[#5F2BF8] text-white px-4 py-2 rounded w-full">
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
