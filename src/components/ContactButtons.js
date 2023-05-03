import Link from "next/link";
import React from "react";
import Email from "./Icons/Email";
import Phone from "./Icons/Phone";
import Location from "./Icons/Location";
import Image from "next/image";

const contactIcons = [
  {
    iconType: "Correo",
    icon: <Email />,
    id: 1,
  },
  {
    iconType: "Ubicacion",
    icon: <Location />,
    id: 2,
  },
  {
    iconType: "Llamar",
    icon: <Phone />,
    id: 3,
  },
];

const ContactButtons = ({ contactButtons }) => {
  const buttons = contactButtons.attributes.botones;
  return (
    <div className="flex gap-10 justify-between items-center w-full flex-wrap">
      {buttons.map((button) => {
        const src = button.foto.data[0].attributes.url
        const myLoader = ({ src }) => {
          return src
        }
        return (
          <div key={button.id} className="flex flex-col items-center gap-2">
            <a target="_blank" className=" w-20 rounded-full" href={button.url}>
              <Image
                loader={myLoader}
                src={src}
                height={500}
                width={500}
                alt={button.foto.data[0].attributes.alt}
                className="rounded-full border-2 border-gray-200"
              />
            </a>
          </div>
        )
      })}
    </div>
  );
};

export default ContactButtons;
