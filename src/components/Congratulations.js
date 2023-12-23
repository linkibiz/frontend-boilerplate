import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Congratulations = ({ slug }) => {
  const [isExploding, setIsExploding] = useState(true);
  const { userData } = useAuthContext();
  const router = useRouter();
  console.log("congrats component", userData);
  return (
    <div>
      {isExploding && (
        <>
          <div className="mt-6 flex flex-col gap-4">
            <h1 className="font-bold">¡Ha creado con exito su perfil Linki!</h1>
            <p className="font-bold">Ahora podra:</p>
            <ul className="flex flex-col gap-3">
              <li>🎨 Personalizar su perfil</li>
              <li>🔗 Agregar redes sociales</li>
              <li>🚀 Compartir su perfil Linki</li>
            </ul>
            <ConfettiExplosion />
          </div>
          <button
            onClick={() => router.push(`/${slug}/profile/edit`) }
            className="mt-5 py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center"
          >
            Continuar
          </button>
        </>
      )}
    </div>
  );
};

export default Congratulations;
