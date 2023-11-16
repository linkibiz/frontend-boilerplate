import { useState } from "react";
import { Transition } from "react-transition-group";

const EditSocialsModal = ({ icon, isOpen, closeModal, selectedPlatform, userData, handleSocialLinksInputChange }) => {
  const [inputError, setInputError] = useState("");

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
            <span
              onClick={closeModal}
              className="absolute top-0 left-0 h-3 w-3 p-4 text-[10px] font-bold flex justify-center items-center rounded-full bg-white m-3"
            >
              X
            </span>
            <div className="bg-black rounded-lg p-10">Modal</div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default EditSocialsModal;
