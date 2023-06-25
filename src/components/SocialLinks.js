import React from "react";
import FacebookIcon from "./Icons/FacebookIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import WebsiteIcon from "./Icons/WebsiteIcon";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Link from "next/link";
import TwitterIcon from "./Icons/TwitterIcon";

const SocialLinks = ({ socialLinks }) => {
  console.log(socialLinks)
  const { facebook, instagram, linkedin, twitter  } = socialLinks;
  const socialMediaPlatforms = [
    {
      platform: "facebook",
      url: facebook,
      icon: <FacebookIcon />,
    },
    {
      platform: "instagram",
      url: instagram,
      icon: <InstagramIcon />,
    },
    {
      platform: "twitter",
      url: twitter,
      icon: <TwitterIcon />,
    },
    {
      platform: "linkedin",
      url: linkedin,
      icon: <LinkedinIcon />,
    },
    
  ];
  return (
    <>
      <h2 className="font-bold">Redes sociales</h2>
      <ul className="flex gap-5 flex-wrap w-full justify-between">
        {socialMediaPlatforms.map(({ platform, url, icon }) =>
          url ? (
            <li className="bg-[#000000] rounded-full p-4 flex justify-center items-center" key={platform}>
              <Link className="h-6 w-6" href={url}>{icon}</Link>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
};

export default SocialLinks;
