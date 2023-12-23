import EmailIcon from "./Icons/EmailIcon";
import PhoneIcon from "./Icons/PhoneIcon";
import WebsiteIcon from "./Icons/WebsiteIcon";
import Whatsapp from "./Icons/Whatsapp";

const contactIcons = [
  {
    iconType: "Correo",
    icon: <EmailIcon />,
    id: 1,
    key: "email", 
  },
  {
    iconType: "Llamar",
    icon: <PhoneIcon />,
    id: 2,
    key: "phone",
  },
  {
    iconType: "Whatsapp",
    icon: <Whatsapp />,
    id: 3,
    key: "whatsapp",
  },
  {
    iconType: "Website",
    icon: <WebsiteIcon />,
    id: 4,
    key: "website",
  },
];

const ContactButtons = ({ contactButtons }) => {
  return (
    <div className="flex gap-10 justify-center items-center w-full">
      {contactIcons.map(({ iconType, icon, id, key }) => {
        const url = contactButtons[key];
        const ref =
          key === "email"
            ? `mailto:${url}`
            : key === "phone"
            ? `tel:${url}`
            : key === "whatsapp"
            ? `https://wa.me/${url?.split(" ").join("")}`
            : url;

        return url ? (
          <div className="flex flex-col items-center gap-2">
            <a href={ref} className="h-14 w-14" target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
            <p className="font-bold text-sm">{iconType}</p>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ContactButtons;
