import React from "react";
import { Transition } from "react-transition-group";

const ContactModal = ({ isOpen, closeContactModal, userData, handleProfileInputChange }) => {
  const handleChange = (e) => {
    handleProfileInputChange(e);
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
              <div className="mt-4">
                <label htmlFor="ocupacion" className="block text-sm font-medium text-white">
                  Ocupacion
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="ocupacion"
                    value={userData.vcard.ocupacion}
                    onChange={handleChange}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="celular" className="block text-sm font-medium text-white">
                  Numero celular
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="celular"
                    value={userData.vcard.celular}
                    onChange={handleChange}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="telefono_casa" className="block text-sm font-medium text-white">
                  Telefono de casa
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="telefono_casa"
                    value={userData.vcard.telefono_casa}
                    onChange={handleChange}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="telefono_trabajo" className="block text-sm font-medium text-white">
                  Telefono de trabajo
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    name="telefono_trabajo"
                    value={userData.vcard.telefono_trabajo}
                    onChange={handleChange}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email_trabajo" className="block text-sm font-medium text-white">
                  Email de trabajo
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email_trabajo"
                    value={userData.vcard.email_trabajo}
                    onChange={handleChange}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div onClick={closeContactModal} className="mt-4 bg-[#5F2BF8] text-white px-4 py-2 rounded w-full">
                Guardar
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default ContactModal;
