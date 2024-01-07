import { useAuthContext } from "@/components/AuthProvider/AuthProvider";
import ContactIconsModal from "@/components/ContactIconsModal";
import EmailIcon from "@/components/Icons/EmailIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import LinkedinIcon from "@/components/Icons/LinkedinIcon";
import PhoneIcon from "@/components/Icons/PhoneIcon";
import ProfileRounded from "@/components/Icons/ProfileRounded";
import TikTokIcon from "@/components/Icons/TikTokIcon";
import TwitterX from "@/components/Icons/TwitterX";
import WebsiteIcon from "@/components/Icons/WebsiteIcon";
import Whatsapp from "@/components/Icons/Whatsapp";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import IconsModal from "@/components/IconsModal";
import InputField from "@/components/InputField";
import LinkModal from "@/components/LinkModal";
import SocialLinkInput from "@/components/SocialLinkInput";
import withAuth from "@/components/withAuth";
import { getToken, removeToken } from "@/utils/helpers";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BlackLogo from "../../../../public/images/linki-logo-black.png";

const socialLinks = [
  { name: "instagram", icon: InstagramIcon, placeholder: "john.doe" },
  { name: "facebook", icon: FacebookIcon, placeholder: "john.doe" },
  { name: "youtube", icon: YoutubeIcon, placeholder: "john.doe" },
  { name: "tiktok", icon: TikTokIcon, placeholder: "john.doe" },
  { name: "twitter", icon: TwitterX, placeholder: "john.doe" },
  { name: "linkedin", icon: LinkedinIcon, placeholder: "john.doe" },
];

const contactLinks = [
  { name: "whatsapp", icon: Whatsapp, placeholder: "6262-6262" },
  { name: "phone", icon: PhoneIcon, placeholder: "6262-6262" },
  { name: "email", icon: EmailIcon, placeholder: "john.doe@gmail.com" },
  { name: "website", icon: WebsiteIcon, placeholder: "www.linkibiz.com" },
];

const ProfileEdit = () => {
  const [profileID, setProfileID] = useState();

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedContactIcon, setSelectedContactIcon] = useState(null);
  const [error, setError] = useState("");
  const [socialMediaModalOpen, setSocialMediaModalOpen] = useState(false);
  const [contactInfoModalOpen, setContactInfoModalOpen] = useState(false);
  const [links, setLinks] = useState([]);
  const [activeLinkIndex, setActiveLinkIndex] = useState(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { slug: slugFromUrl } = router.query;
  const [slug, setSlug] = useState(slugFromUrl);
  const [isLoading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const { userData, setUserData } = useAuthContext();

  useEffect(() => {
    // Si no hay slug en la URL, redirige o maneja de otra manera
    if (!slug) {
      router.push("/login");
      return;
    }
    fetchProfileData(slug);
  }, [slug, router]);

  useEffect(() => {
    if (userData.avatar) {
      setPreviewUrl(userData.avatar);
    }
  }, [userData.avatar]);

  useEffect(() => {
    if (userData && userData.links) {
      setLinks(userData.links);
    }
  }, [userData.links]); // Only depend on userData.links

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const src = userData.avatar || "";

  const handleSocialLinksInputChange = (value, platformName) => {
    setUserData({
      ...userData,
      redes_sociales: {
        ...userData.redes_sociales,
        [platformName]: value,
      },
    });
  };

  const handleContactLinksInputChange = (value, platformName) => {
    setUserData({
      ...userData,
      contact_buttons: {
        ...userData.contact_buttons,
        [platformName]: value,
      },
    });
  };

  const fetchProfileData = async (slug) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles?filters[slug][$eq]=${slug}&populate=deep`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.data && response.data.data.length > 0) {
        setProfileData(response.data.data[0]);
        setProfileID(response.data.data[0].id);
      } else {
        setError("Profile not found");
        router.push("/");
      }
    } catch (error) {
      console.error(`Error fetching user: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpdate = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("files", selectedImage);
        formData.append("ref", "api::profile.profile");
        formData.append("refId", profileID);
        formData.append("field", "avatar");
        const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/upload`, formData);
        if (response.status === 200 && response.data && response.data.length > 0) {
          const newAvatarUrl = response.data[0].url;
          setUserData({ ...userData, avatar: newAvatarUrl }); // Update global state
          return newAvatarUrl;
        }
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    if (e) e.preventDefault();
    try {
      setLoading(true);
      handleAvatarUpdate();
      // Process nombre_completo
      const [nombre, apellido] =
        userData.nombre_completo.split(" ").length > 1 ? userData.nombre_completo.split(" ") : [userData.nombre_completo, ""]; // Default apellido to empty if not provided
      // Filter out links with empty titulo or url
      const validLinks = links.filter((link) => link.titulo.trim() !== "" && link.url.trim() !== "");
      // Construct vcard object
      const vcard = {
        nombre,
        apellido,
        ocupacion: userData.ocupacion,
        email: userData.contact_buttons.email,
        celular: userData.contact_buttons.whatsapp,
        website: userData.contact_buttons.website,
      };

      // Prepare updated profile data
      const updatedProfileData = {
        ...userData,
        vcard,
        links: validLinks,
      };

      // Get the current state of the resource
      const getResponse = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/${profileID}?populate=deep`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const currentData = getResponse.data.data.attributes;

      // Prepare data for PUT request (Use updatedProfileData)
      const { avatar: currentAvatar, id: currentId, ...dataWithoutCurrentAvatarAndId } = currentData;
      const { avatar: userAvatar, id: userId, ...dataWithoutUserAvatarAndId } = updatedProfileData;

      const updatedData = { ...dataWithoutCurrentAvatarAndId, ...dataWithoutUserAvatarAndId };

      // Make the PUT request
      const putResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/${profileID}`,
        { data: updatedData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
      setError("Error while updating profile data");
    } finally {
      setLoading(false);
    }
  };

  const saveProfileData = async () => {
    await handleProfileUpdate();
    router.push(`/${userData.slug}`);
  };

  const openLinkModal = (index) => {
    setActiveLinkIndex(index);
    setIsLinkModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false); // Close the modal
    setActiveLinkIndex(null); // Reset the active link index
  };

  const addNewLink = () => {
    setActiveLinkIndex(null); // Indicate a new link
    setIsLinkModalOpen(true); // Open the modal
  };

  const saveLink = (link) => {
    let updatedLinks = [...userData.links];

    if (activeLinkIndex !== null) {
      updatedLinks[activeLinkIndex] = link;
    } else {
      updatedLinks.push(link);
    }

    updatedLinks = updatedLinks.filter((l) => l.titulo.trim() !== "" || l.url.trim() !== "");
    setUserData({ ...userData, links: updatedLinks }); // Update global state
    closeLinkModal();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setSelectedImage(img);
      setPreviewUrl(URL.createObjectURL(img));
    }
  };

  const triggerFileSelectPopup = () => {
    fileInputRef.current.click();
  };

  const handleEndSession = () => {
    removeToken();
    router.push("/");
  };

  return (
    <div className="bg-[#F3F4F6] w-[425px] flex flex-col min-h-[100vh] p-3">
      <div className="flex flex-col px-2 py-4 items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
        {!isLoading ? (
          <>
            <div className="w-full mb-4 text-left flex justify-between items-center">
              <div>
                <h3 className="">Bienvenido,</h3>
                <h1 className="font-bold text-2xl">{userData.nombre_completo?.split(" ")[0]}</h1>
                <span onClick={handleEndSession} className="text-red-500 font-bold">
                  Terminar sesión
                </span>
              </div>
              <Link href="/">
                <Image src={BlackLogo} className="w-[125px]" alt="Linki logo" />
              </Link>
            </div>

            <div className="w-full mb-[100px] rounded-lg overflow-hidden sm:max-w-md sm:rounded-lg">
              <form className="bg-white p-4" onSubmit={handleProfileUpdate}>
                {src === "" ? (
                  ""
                ) : (
                  <>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />

                    <div className="relative flex flex-row items-start justify-center mx-auto">
                      <div className="flex flex-col gap-2 grow items-start justify-between">
                        <h3 className="font-bold">Foto de perfil</h3>
                        <span>Recomendado 300 x 300 </span>
                        <button
                          type="button"
                          onClick={triggerFileSelectPopup}
                          className="bg-white hover:bg-gray-100 text-sm text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg"
                        >
                          Cambiar
                        </button>
                      </div>
                      <div>
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Profile picture"
                            className="border-white border-[3px] h-[125px] w-[125px] object-cover rounded-full"
                            onClick={triggerFileSelectPopup}
                            width={100}
                            height={100}
                          />
                        ) : (
                          // Placeholder image
                          <div className="h-[150px]" onClick={triggerFileSelectPopup}>
                            <ProfileRounded />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-4">
                  <InputField
                    name="nombre_completo"
                    type="text"
                    value={userData?.nombre_completo}
                    onChange={handleUserInputChange}
                    placeholder="Nombre completo"
                    label="Nombre"
                    showLabel
                  />
                </div>
                <div className="mt-4">
                  <InputField
                    name="ocupacion"
                    type="text"
                    value={userData?.ocupacion}
                    onChange={handleUserInputChange}
                    placeholder="Ocupacion"
                    label="Ocupacion"
                    showLabel
                  />
                </div>
                <div className="mt-4">
                  <div className="flex flex-col items-start">
                    <label htmlFor="sobre_mi" className="block text-sm font-medium text-black">
                      Bio
                    </label>
                    <textarea
                      name="sobre_mi"
                      rows="5"
                      cols="33"
                      placeholder="Bio"
                      value={userData?.sobre_mi}
                      onChange={handleUserInputChange}
                      className="p-3 bg-[#F3F4F6] text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className=" text-black my-3 font-bold uppercase tracking-wide">Informacion de contacto</h3>
                  <div className="container mx-auto p-4 bg-[#F3F4F6] rounded-lg flex flex-col gap-4">
                    <div className="flex gap-3 justify-between flex-wrap">
                      {contactLinks.map((link, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedContactIcon(link);
                            setContactInfoModalOpen(true);
                          }}
                        >
                          <SocialLinkInput name={link.name} IconComponent={link.icon} placeholder={link.placeholder} />
                        </div>
                      ))}
                    </div>
                    {selectedContactIcon && contactInfoModalOpen && (
                      <ContactIconsModal
                        isOpen={contactInfoModalOpen}
                        closeModal={() => setContactInfoModalOpen(false)}
                        selectedPlatform={selectedContactIcon}
                        IconComponent={selectedContactIcon.icon}
                        userData={userData}
                        handleContactLinksInputChange={handleContactLinksInputChange}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className=" text-black my-3 font-bold uppercase tracking-wide">Redes sociales</h3>
                  <div className="container mx-auto p-4 bg-[#F3F4F6] rounded-lg flex flex-col gap-4">
                    <div className="flex gap-3 justify-between flex-wrap">
                      {socialLinks.map((link, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedPlatform(link);
                            setSocialMediaModalOpen(true);
                          }}
                        >
                          <SocialLinkInput name={link.name} IconComponent={link.icon} placeholder={link.placeholder} />
                        </div>
                      ))}
                    </div>
                    {selectedPlatform && socialMediaModalOpen && (
                      <IconsModal
                        isOpen={socialMediaModalOpen}
                        closeModal={() => setSocialMediaModalOpen(false)}
                        selectedPlatform={selectedPlatform}
                        IconComponent={selectedPlatform.icon}
                        userData={userData}
                        handleSocialLinksInputChange={handleSocialLinksInputChange}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-black my-3 font-bold uppercase tracking-wide">Enlaces</h3>
                  <div className="container mx-auto p-4 bg-[#F3F4F6] rounded-lg flex gap-3 flex-col text-center">
                    {links.map((link, index) => (
                      <button
                        type="button"
                        key={index}
                        className="text-black w-full bg-white font-bold py-2 px-4 rounded"
                        onClick={() => openLinkModal(index)}
                      >
                        Enlace {index + 1}
                      </button>
                    ))}
                    <button
                      disabled={links.length >= 3}
                      type="button"
                      className={`text-white w-full font-bold py-2 px-4 rounded ${links.length >= 3 ? "bg-gray-500" : "bg-black"}`}
                      onClick={addNewLink}
                    >
                      Agregar enlace
                    </button>
                  </div>
                </div>
                {isLinkModalOpen && (
                  <LinkModal
                    isOpen={isLinkModalOpen}
                    onClose={closeLinkModal}
                    link={activeLinkIndex !== null ? links[activeLinkIndex] : { titulo: "", url: "" }}
                    saveLink={saveLink}
                  />
                )}
                <div className="fixed inset-x-0 bottom-0 bg-[#F3F4F6] p-4 shadow-md flex gap-4">
                  <button
                    type="button"
                    onClick={saveProfileData}
                    className="py-4 px-5 w-full bg-black text-white rounded-lg font-bold text-center"
                  >
                    Ver perfil
                  </button>
                  <button
                    type="submit"
                    className="py-4 px-5 w-full bg-white border border-black  text-black rounded-lg font-bold text-center"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(ProfileEdit);
