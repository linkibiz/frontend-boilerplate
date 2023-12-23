import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { SafariIcon } from "./Icons/SafariIcon";

const LinkModal = ({ isOpen, onClose, link, setLink, saveLink }) => {
  const [localLink, setLocalLink] = useState({ titulo: "", url: "" });

  useEffect(() => {
    // Initialize the local state with the passed link or default to empty
    setLocalLink(link || { titulo: "", url: "" });
  }, [link, isOpen]); // Add isOpen to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalLink((prevLink) => ({
      ...prevLink,
      [name]: value,
    }));
  };

  const handleSave = () => {
    saveLink(localLink); // Save the current state of the local link
    onClose(); // Close the modal
  };

  return (
    <Transition in={isOpen} timeout={400} unmountOnExit>
      {(state) => (
        <div
          className={`z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-200 ${
            state === "entering" || state === "entered" ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative w-full max-w-[325px]">
            <span
              style={{
                display: "flex",
              }}
              onClick={onClose}
              className="absolute top-0 left-0 h-3 w-3 p-4 text-[10px] font-bold flex justify-center items-center rounded-full bg-white m-3"
            >
              X
            </span>
            <div className="bg-[#F3F4F6] rounded-lg p-10">
              <div className="mb-4 flex gap-4 justify-between items-center flex-col">
                <div className="h-[88px]">
                  <SafariIcon />
                </div>

                <h2 className="text-black capitalize font-bold">Enlace</h2>
              </div>
              <div className="flex flex-col gap-3">
                <input
                  className="border p-2 w-full rounded-md"
                  type="text"
                  name="titulo"
                  placeholder="titulo"
                  value={localLink.titulo}
                  onChange={handleChange}
                />
                <input
                  className="border p-2 w-full rounded-md"
                  type="text"
                  name="url"
                  placeholder="URL"
                  value={localLink.url}
                  onChange={handleChange}
                />
              </div>
              <div
                style={{
                  display: "block",
                }}
                onClick={handleSave}
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

export default LinkModal;
