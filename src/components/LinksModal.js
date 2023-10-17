import React, { useState, useEffect } from "react";
import { Transition } from "react-transition-group";

const LinksModal = ({ isOpen, closeContactModal, handleLinksInputChange, initialLinks }) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  const handleChange = (index, field, e) => {
    const newLinks = [...links];
    newLinks[index][field] = e.target.value;
    setLinks(newLinks);
  };

  const addLink = () => {
    const newLinks = [...links, { titulo: "", url: "" }];
    setLinks(newLinks);
  };

  const removeLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const saveLinks = () => {
    handleLinksInputChange(links);
    closeContactModal();
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
            <div className="bg-black rounded-lg p-4 flex flex-col gap-5">
              <div className="mb-4 flex gap-4 justify-between items-center flex-col">
                <h2 className="text-white capitalize ">Links</h2>
              </div>
              {links?.map((link, index) => (
                <div key={index} className="relative flex flex-col gap-1">
                  <label htmlFor={`link-title-${index}`} className="block text-sm font-medium text-white">
                    Título:
                  </label>
                  <input
                    id={`link-title-${index}`}
                    name={`link-title-${index}`}
                    type="text"
                    value={link.titulo}
                    placeholder="Google"
                    onChange={(e) => handleChange(index, "titulo", e)}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                  <label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-white">
                    URL:
                  </label>
                  <input
                    id={`link-url-${index}`}
                    name={`link-url-${index}`}
                    type="text"
                    value={link.url}
                    placeholder="www.google.com"
                    onChange={(e) => handleChange(index, "url", e)}
                    className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
                  />
                  <button className=" text-red-600  absolute top-0 right-0" type="button" onClick={() => removeLink(index)}>
                    Quitar link
                  </button>
                </div>
              ))}
              {links.length < 3 && (
                <button
                  type="button"
                  className="mt-4 bg-transparent border border-white text-white px-4 py-2 rounded w-full"
                  onClick={addLink}
                >
                  Agregar link
                </button>
              )}

              <button
                onClick={saveLinks}
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

export default LinksModal;
