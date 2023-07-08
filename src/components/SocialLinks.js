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
import { PinterestIcon } from "./Icons/PinterestIcon";

const SocialLinks = ({ socialLinks }) => {
  const { pinterest,facebook, instagram, linkedin, twitter, website, tiktok, youtube, whatsapp, email } = socialLinks;
  const socialMediaPlatforms = [
    {
      platform: "facebook",
      url: facebook,
      link: "https://www.facebook.com",
      icon: <FacebookIcon />,
    },
    {
      platform: "instagram",
      url: instagram,
      link: "https://www.instagram.com",
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
      link: "https://twitter.com",
      icon: <TwitterIcon />,
    },
    {
      platform: "website",
      url: website,
      link: "https://www.linkedin.com/in",
      icon: <WebsiteIcon />,
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
    // {
    //   platform: "email",
    //   url: email,
    //   link: "mailto:",
    //   icon: <Email />,
    // },
  ];
  return (
    <>
      <ul className="w-[350px] overflow-x-auto overflow-y-hidden whitespace-nowrap flex gap-5 pl-4">
        {socialMediaPlatforms.map(({ platform, url, icon, link }) =>
          url ? (
            <li className="shadow-3xl rounded-full bg-transparent" key={platform}>
              <Link className="h-[54px] w-[54px] block" href={`${link}/${url}`} target="_blank">
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
