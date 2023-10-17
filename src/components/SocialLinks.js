import React from "react";
import FacebookIcon from "./Icons/FacebookIcon";
import InstagramIcon from "./Icons/InstagramIcon";
import WebsiteIcon from "./Icons/WebsiteIcon";
import LinkedinIcon from "./Icons/LinkedinIcon";
import Link from "next/link";
import TwitterIcon from "./Icons/TwitterIcon";
import TikTokIcon from "./Icons/TikTokIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";
import WhatsAppIcon from "./Icons/WhatsAppIcon";
import Email from "./Icons/Email";
import PinterestIcon from "./Icons/PinterestIcon";

const SocialLinks = ({ socialLinks }) => {
  const { pinterest, facebook, instagram, linkedin, twitter, tiktok, youtube, whatsapp, email } = socialLinks;
  const nullValuesCount = Object.values(socialLinks).filter((value) => value === null).length;
  const socialMediaPlatforms = [
    {
      platform: "facebook",
      url: facebook,
      link: "https://www.facebook.com/",
      icon: <FacebookIcon />,
    },
    {
      platform: "instagram",
      url: instagram,
      link: "https://www.instagram.com/",
      icon: <InstagramIcon />,
    },
    {
      platform: "tiktok",
      url: tiktok,
      link: "https://www.tiktok.com/@",
      icon: <TikTokIcon />,
    },
    {
      platform: "linkedin",
      url: linkedin,
      link: "https://www.linkedin.com/in",
      icon: <LinkedinIcon />,
    },
    {
      platform: "twitter",
      url: twitter,
      link: "https://twitter.com/",
      icon: <TwitterIcon />,
    },
    {
      platform: "youtube",
      url: youtube,
      link: "https://www.youtube.com/@",
      icon: <YoutubeIcon />,
    },
    {
      platform: "pinterest",
      url: pinterest,
      link: "https://www.pinterest.com/",
      icon: <PinterestIcon />,
    },
  ];
  return (
    <>
      {nullValuesCount < 7 && <h2 className="font-bold">Redes sociales</h2>}

      <ul className={`w-[370px] overflow-x-auto overflow-y-hidden whitespace-nowrap flex gap-6 justify-start`}>
        {socialMediaPlatforms.map(({ platform, url, icon, link }) =>
          url ? (
            <li className={`rounded-full bg-transparent ${nullValuesCount < 4 ? "w-[25%]" : "w-[15%]"} min-w-[16%]`} key={platform}>
              <Link className="w-full block" href={`${link}${url}`} target="_blank">
                {icon}
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </>
  );
};

export default SocialLinks;
