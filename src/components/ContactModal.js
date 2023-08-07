import React from "react";
import { Transition } from "react-transition-group";
import InputField from "./InputField";

const ContactModal = ({ isOpen, closeContactModal, userData, handleContactCardInputChange }) => {
  const handleChange = (e) => {
    handleContactCardInputChange(e);
  };

  return (
    <Transition in={isOpen} timeout={400} unmountOnExit>
      {(state) => (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-200 ${
            state === "entering" || state === "entered" ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full max-w-[325px]">
            <span
              onClick={closeContactModal}
              className="absolute top-0 right-0 h-3 w-3 p-4 text-[10px] font-bold flex justify-center items-center rounded-full bg-white m-3"
            >
              X
            </span>
            <div className="bg-black rounded-lg p-8">
              <div className="mb-4 flex gap-4 justify-between items-center flex-col">
                <h2 className="text-white capitalize ">Tarjeta de contacto</h2>
              </div>

              <InputField type="text" name="ocupacion" value={userData.vcard?.ocupacion} onChange={handleChange} label="Ocupacion" />

              <InputField type="number" name="celular" value={userData.vcard?.celular} onChange={handleChange} label="Numero celular" />

              <InputField type="text" name="website" value={userData.vcard?.website} onChange={handleChange} label="Website" />

              <InputField
                type="number"
                name="telefono_casa"
                value={userData.vcard?.telefono_casa}
                onChange={handleChange}
                label="Telefono de casa"
              />

              <InputField
                type="number"
                name="telefono_trabajo"
                value={userData.vcard?.telefono_trabajo}
                onChange={handleChange}
                label="Telefono de trabajo"
              />

              <InputField
                type="email"
                name="email_trabajo"
                value={userData.vcard?.email_trabajo}
                onChange={handleChange}
                label="Email de trabajo"
              />

              <button
                onClick={closeContactModal}
                class="w-full mt-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default ContactModal;
