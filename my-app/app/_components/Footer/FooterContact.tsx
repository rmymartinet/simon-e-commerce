import { CiMail } from "react-icons/ci";
import {
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";
import { IoIosMail } from "react-icons/io";

const FooterContact = () => {
  const socialIcons = [
    { icon: <PiInstagramLogoFill size={30} />, label: "Instagram" },
    { icon: <PiYoutubeLogoFill size={30} />, label: "YouTube" },
    { icon: <PiLinkedinLogoFill size={30} />, label: "LinkedIn" },
    { icon: <IoIosMail size={30} />, label: "Mail" },
  ];

  return (
    <div className="flex w-max justify-between gap-10 text-lg lg:flex-col">
      <div className="flex gap-20">
        <div className="program-button-container absolute bottom-8 left-8 z-50 grid grid-cols-4 gap-2 rounded-xl p-2 md:left-1/2 md:-translate-x-1/2">
          {socialIcons.map((log, index) => (
            <button
              key={index}
              className="padding grid place-content-center rounded-xl focus:outline-none"
            >
              {log.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
