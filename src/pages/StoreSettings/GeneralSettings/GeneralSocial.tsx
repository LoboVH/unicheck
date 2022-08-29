import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import Input from "../../../components/Input/Input"
import { BASE_URL } from "../../../config";
import { IGeneral } from "../../../models/General";
import { ISocialLinks } from "../../../models/SocialLink";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillBehanceCircle,
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import {
  FaDiscord,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaDribbbleSquare,
  FaStackOverflow,
} from "react-icons/fa";
import { axiosConfig } from "../../../services/api/supplier";
const GeneralSocial = () => {
  //@ts-ignore
  const [socialLinks, setSocialLinks] = useState<ISocialLinks>({});
  const size = "2.5em";
  const socials = [
    {
      title: "facebook",
      link: socialLinks && socialLinks.facebook ? socialLinks.facebook : "",
      placeholder: "Enter Facebook url",
      logo: <AiFillFacebook size={size} />,
    },
    {
      title: "instagram",
      link: socialLinks && socialLinks.instagram ? socialLinks.instagram : "",
      placeholder: "Enter Instagram url",
      logo: <AiFillInstagram size={size} />,
    },
    {
      title: "discord",
      link: socialLinks && socialLinks.discord ? socialLinks.discord : "",
      placeholder: "Enter Discord url",
      logo: <FaDiscord size={size} />,
    },
    {
      title: "pinterest",
      link: socialLinks && socialLinks.pinterest ? socialLinks.pinterest : "",
      placeholder: "Enter Pinterest url",
      logo: <FaPinterest size={size} />,
    },
    {
      title: "reddit",
      link: socialLinks && socialLinks.reddit ? socialLinks.reddit : "",
      placeholder: "Enter Reddit url",
      logo: <FaReddit size={size} />,
    },
    {
      title: "behance",
      link: socialLinks && socialLinks.behance ? socialLinks.behance : "",
      placeholder: "Enter Behnace url",
      logo: <AiFillBehanceCircle size={size} />,
    },
    {
      title: "telegram",
      link: socialLinks && socialLinks.telegram ? socialLinks.telegram : "",
      placeholder: "Enter Telegram url",
      logo: <FaTelegram size={size} />,
    },
    {
      title: "linkedIn",
      link: socialLinks && socialLinks.linkedIn ? socialLinks.linkedIn : "",
      placeholder: "Enter LinkedIn url",
      logo: <AiFillLinkedin size={size} />,
    },
    {
      title: "twitter",
      link: socialLinks && socialLinks.twitter ? socialLinks.twitter : "",
      placeholder: "Enter Twitter url",
      logo: <AiFillTwitterCircle size={size} />,
    },
    {
      title: "portfolio",
      link: socialLinks && socialLinks.portfolio ? socialLinks.portfolio : "",
      placeholder: "Enter Portfolio url",
      logo: <CgWebsite size={size} />,
    },
    {
      title: "youtube",
      link: socialLinks && socialLinks.youtube ? socialLinks.youtube : "",
      placeholder: "Enter Youtube url",
      logo: <AiFillYoutube size={size} />,
    },
    {
      title: "dribble",
      link: socialLinks && socialLinks.dribble ? socialLinks.dribble : "",
      placeholder: "Enter Dribble url",
      logo: <FaDribbbleSquare size={size} />,
    },
    {
      title: "stackoverflow",
      link:
        socialLinks && socialLinks.stackoverflow
          ? socialLinks.stackoverflow
          : "",
      placeholder: "Enter Stackoverflow url",
      logo: <FaStackOverflow size={size} />,
    },
  ];
  
  useEffect(() => {
    getSocialLinks();
  }, []);
  const getSocialLinks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/general/socialLinks`);
      if (res.data) {
        setSocialLinks(res.data.result);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  const handleSocialLink = (title, link) => {
    setSocialLinks({ ...socialLinks, [title]: link });
  };
  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/general/socialLinks`,
        socialLinks, axiosConfig
      );
      if (res) {
        toast.success("Saved Changes");
      } else {
        throw "Failed";
      }
    } catch (err) {
      console.log("err", err);
      if (err.response) {
        toast.error(err.response.data.err);
      } else {
        toast.error(err.message);
      }
    }
  };

  

  return (
    <div className="general-social">
      <div className="socialInputs">
        {socials.map((social) => (
          <Input
            key={social.title}
            title={social.title.toUpperCase()}
            placeholder={`Enter ${social.title} url`}
            state={social.link}
            setState={(e)=> handleSocialLink(social.title, e)}
          />
        ))}
      </div>
      <button className="btn" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default GeneralSocial
