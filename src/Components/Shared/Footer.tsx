import logo from "../../assets/logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <div className="flex flex-col font-main justify-center items-center bg-secondary p-4 gap-4">
      <img src={logo} />
      <h2 className="text-main" dir="ltr">100% ONLINE</h2>
      <div className="flex gap-4">
        <a>
          <FaFacebook />
        </a>
        <a>
          <FaXTwitter />
        </a>
        <a>
          <FaInstagram />
        </a>
        <a>
          <FaTelegram />
        </a>
        <a>
          <FaYoutube />
        </a>
      </div>
      <p className="text-main">تهدف هذه المنصة إلى تجربة تعليمية ممتعة ومفيدة.</p>
    </div>
  );
};
export default Footer;
