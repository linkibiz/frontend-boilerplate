import Link from "next/link";
import React, {useState} from "react";
const Links = ({ linksList }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {linksList.length > 0 && (
        <div className="flex flex-col gap-3 w-full items-left">
          <p className="font-bold">Links</p>
          {linksList.map((link) => (
            <>
              {link.titulo != "Biografía" ? (
                <Link
                  href={link.url}
                  target={link.target}
                  className="w-full p-3 font-bold w-4/5 text-center bg-[#000000] rounded-md text-white"
                  key={link.id}
                >
                  {link.titulo}
                </Link>
              ) : (
                <button
                  className="w-full p-3 font-bold text-center bg-[#000000] rounded-md text-white"
                  key={link.id}
                  onClick={() => setShowModal(true)}
                >
                  {link.titulo}
                </button>
              )}
              {showModal && link.titulo == "Biografía" ? (
                <>
                  <div className="justify-center p-5 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold text-center">Mi Biografia</h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their
                            perception won’t do anything. I was taught I could do everything.
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Links;
