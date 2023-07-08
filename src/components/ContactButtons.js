import Link from "next/link";
import React from "react";
import Email from "./Icons/Email";
import Phone from "./Icons/Phone";
import Location from "./Icons/Location";
import WebsiteIcon from "./Icons/WebsiteIcon";
import RightArrowIcon from "./Icons/RightArrowIcon";
import WhatsAppIcon from "./Icons/WhatsAppIcon";

const contactIcons = [
  {
    iconType: "Correo",
    icon: <Email />,
    id: 1,
  },
  {
    iconType: "Llamar",
    icon: <Phone />,
    id: 2,
  },
  {
    iconType: "Whatsapp",
    icon: <WhatsAppIcon />,
    id: 3,
  },
  {
    iconType: "Website",
    icon: <WebsiteIcon />,
    id: 4,
  },
];

const ContactButtons = ({ contactButtons }) => {
  // const contactButtons = contactData.attributes.botones;
  return (
    <div className="flex w-full flex-col items-start gap-3">
      {contactIcons.map(({ iconType, icon, id }) => {
        const dataItem = contactButtons.find((item) => item.titulo_de_boton === iconType);
        const ref =
          dataItem?.titulo_de_boton === "Correo"
            ? `mailto:${dataItem.url}`
            : dataItem?.titulo_de_boton === "Llamar"
            ? `tel:${dataItem.url}`
            : dataItem?.titulo_de_boton === "Whatsapp"
            ? `https://wa.me/${dataItem.url.split(' ').join('')}`
            : dataItem?.url;
        return dataItem ? (
          <div className="w-full bg-[#0a0a0a] p-[10px] rounded-lg">
            <Link href={ref} className="text-orange-500" target="blank">
              <div className="flex items-center gap-5 justify-start">
                <div className="h-5 grow-0">{icon}</div>
                <div className="text-sm grow">{dataItem.titulo_de_boton}</div>
                <div className="absolute right-[10%]">
                  {">"}
                </div>
              </div>
            </Link>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ContactButtons;
