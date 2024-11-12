import { CiMail } from "react-icons/ci";
import { GrLocationPin } from "react-icons/gr";
import {
  PiInstagramLogoFill,
  PiLinkedinLogoFill,
  PiYoutubeLogoFill,
} from "react-icons/pi";

const FooterContact = () => {
  const socialIcons = [
    { icon: <PiInstagramLogoFill size={20} />, label: "Instagram" },
    { icon: <PiYoutubeLogoFill size={20} />, label: "YouTube" },
    { icon: <PiLinkedinLogoFill size={20} />, label: "LinkedIn" },
  ];

  return (
    <div className="flex flex-col gap-10 text-lg">
      <div className="flex gap-20">
        <div className="flex items-center gap-4">
          <GrLocationPin size={20} aria-label="Location icon" />
          <span>Cognac, France</span>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <CiMail size={20} aria-label="Mail icon" />
          <span>Contactez-moi</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        {socialIcons.map(({ icon, label }, idx) => (
          <span key={idx} aria-label={label}>
            {icon}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FooterContact;
