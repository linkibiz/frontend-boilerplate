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

const SocialLinks = ({ socialLinks }) => {
  const { facebook, instagram, linkedin, twitter, website, tiktok, youtube, whatsapp, email } = socialLinks;
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
      platform: "tiktok",
      url: tiktok,
      link: "https://www.tiktok.com/@",
      icon: <TikTokIcon />,
    },
    {
      platform: "youtube",
      url: youtube,
      link: "https://www.youtube.com/@",
      icon: <YoutubeIcon />,
    },
    {
      platform: "whatsapp",
      url: whatsapp,
      link: "https://wa.me/",
      icon: <WhatsAppIcon />,
    },
    {
      platform: "email",
      url: email,
      link: "mailto:",
      icon: <Email />,
    },
    {
      platform: "linkedin",
      url: linkedin,
      link: "https://www.linkedin.com/in",
      icon: <LinkedinIcon />,
    },
  ];
  return (
    <>
      <ul className="flex gap-5 flex-wrap w-full justify-between">
        {socialMediaPlatforms.map(({ platform, url, icon, link }) =>
          url ? (
            <li className="shadow-3xl rounded-full bg-transparent" key={platform}>
              <Link className="h-[60px] w-[60px] block" href={`${link}/${url}`} target="_blank">
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
