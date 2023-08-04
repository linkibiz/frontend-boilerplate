import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/auth-context";
import FacebookIcon from "./Icons/FacebookIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import TwitterIcon from "./Icons/TwitterIcon";
import WebsiteIcon from "./Icons/WebsiteIcon";
import TikTokIcon from "./Icons/TikTokIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";

import LinkedinIcon from "./Icons/LinkedinIcon";
import IconsModal from "./IconsModal";
import ContactIcon from "./Icons/ContactIcon";
import ContactModal from "./ContactModal";
import LinksIcon from "./Icons/LinksIcon";
import LinksModal from "./LinksModal";
import LoadingSpinner from "./LoadingSpinner";
const CreateProfile = ({ onSubmit, userId }) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [socialMediaModalOpen, setSocialMediaModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [linksModalOpen, setLinksModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const socialMediaPlatforms = [
    {
      name: "facebook",
      icon: <FacebookIcon />,
    },
    {
      name: "instagram",
      icon: <InstagramIcon />,
    },
    {
      name: "twitter",
      icon: <TwitterIcon />,
    },
    {
      name: "tiktok",
      icon: <TikTokIcon />,
    },
    {
      name: "youtube",
      icon: <YoutubeIcon />,
    },
    {
      name: "linkedin",
      icon: <LinkedinIcon />,
    },
  ];

  const handleProfileInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleContactCardInputChange = (e) => {
    setUserData({
      ...userData,
      vcard: {
        ...userData.vcard,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSocialLinksInputChange = (e) => {
    setUserData({
      ...userData,
      redes_sociales: {
        ...(userData.redes_sociales || {}),
        [selectedPlatform.name]: e.target.value,
      },
    });
  };

  const handleLinksInputChange = (newLinks) => {
    setUserData({
      ...userData,
      links: newLinks,
    });
  };

  const handleSubmit = async (e) => {

    setIsLoading(true)
    e.preventDefault();
    try {
      const updatedUserData = {
        ...userData,
        profile: userId,
        slug: userData.username,
        // ocupacion: userData.vcard.ocupacion,
        redes_sociales: {
          facebook: userData.redes_sociales.facebook,
          linkedin: userData.redes_sociales.linkedin,
          twitter: userData.redes_sociales.twitter,
          instagram: userData.redes_sociales.instagram,
          website: userData.redes_sociales.website,
          tiktok: userData.redes_sociales.tiktok,
          whatsapp: userData.redes_sociales.whatsapp,
          youtube: userData.redes_sociales.youtube,
          email: userData.redes_sociales.email,
        },
        vcard: {
          nombre: userData.nombre_completo.split(" ")[0],
          apellido: userData.nombre_completo.split(" ")[1],
          email: userData.email,
          ocupacion: userData.vcard.ocupacion,
          celular: userData.vcard.celular,
          telefono_casa: userData.vcard.telefono_casa,
          telefono_trabajo: userData.vcard.telefono_trabajo,
          email_trabajo: userData.vcard.email_trabajo,
        },
        links: userData.links,
        botones: [
          {
            titulo_de_boton: "Whatsapp",
            url: userData.vcard.celular,
          },
          {
            titulo_de_boton: "Llamar",
            url: userData.vcard.celular,
          },
          {
            titulo_de_boton: "Correo",
            url: userData.email,
          },
        ],
      };

      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles`, { data: updatedUserData });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      // Updating the userData in the context
      setUserData(updatedUserData);
      console.log(response.data.data.attributes.slug, response.data.data.id);
      onSubmit(response.data.data.id, response.data.data.attributes.slug);
    } catch (error) {
      console.error("Error updating user data:", error.message);
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className=" bg-black flex flex-col items-center min-h-screen pt-4 sm:justify-center sm:pt-0">
      <div className="w-full px-6 py-4 overflow-hidden sm:max-w-md sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="sobre_mi" className="block text-sm font-medium text-white">
              Sobre Mí:
            </label>
            <div className="flex flex-col items-start">
              <textarea
                name="sobre_mi"
                rows="5"
                cols="33"
                value={userData.sobre_mi}
                onChange={handleProfileInputChange}
                className="bg-[#1c1a20] text-white p-2 block w-full mt-1 border border-gray-600 rounded-md shadow-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className=" text-white my-3 font-bold">Información de contacto</h3>
            <div
              className="h-[64px] bg-[#1c1a20] rounded-2xl p-3 flex items-center gap-5"
              onClick={() => {
                setContactModalOpen(true);
              }}
            >
              <div className="max-w-[24px] grow-0">
                <ContactIcon />
              </div>
              <div className="grow-1">
                <h3 className="text-white">Tarjeta de contacto</h3>
              </div>
            </div>
            {contactModalOpen && (
              <ContactModal
                isOpen={contactModalOpen}
                closeContactModal={() => setContactModalOpen(false)}
                userData={userData}
                handleContactCardInputChange={handleContactCardInputChange}
              />
            )}
          </div>
          <div className="mt-4">
            <div
              className="h-[64px] bg-[#1c1a20] rounded-2xl p-3 flex items-center gap-5"
              onClick={() => {
                setLinksModalOpen(true);
              }}
            >
              <div className="max-w-[24px] grow-0">
                <LinksIcon />
              </div>
              <div className="grow-1">
                <h3 className="text-white">Links</h3>
              </div>
            </div>
            {linksModalOpen && (
              <LinksModal
                isOpen={linksModalOpen}
                closeContactModal={() => setLinksModalOpen(false)}
                userData={userData}
                handleLinksInputChange={handleLinksInputChange}
                initialLinks={links}
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className=" text-white my-3 font-bold">Redes sociales</h3>
            <div className="flex flex-wrap gap-3 justify-between">
              {socialMediaPlatforms.map((platform) => (
                <div
                  className="w-[48px]"
                  key={platform.name}
                  onClick={() => {
                    setSelectedPlatform(platform);
                    setSocialMediaModalOpen(true);
                  }}
                >
                  {platform.icon}
                </div>
              ))}
            </div>
          </div>
          {selectedPlatform && (
            <IconsModal
              isOpen={socialMediaModalOpen}
              closeModal={() => setSocialMediaModalOpen(false)}
              selectedPlatform={selectedPlatform}
              icon={selectedPlatform.icon}
              userData={userData}
              handleSocialLinksInputChange={handleSocialLinksInputChange}
            />
          )}

          <div className="flex items-center justify-end mt-8 flex-col gap-3">
            <button
              type="submit"
              class="w-full max-w-[250px] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {isLoading ? <LoadingSpinner /> : "Siguiente"}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
