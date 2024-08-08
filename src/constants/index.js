import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

export const headerLinks = [
  { label: "Home", url: "/", adminOnly: false },
  // { label: "Posts", url: "/admin/posts", adminOnly: true },
  // {
  //   label: "Categories",
  //   url: "/admin/categories",
  //   adminOnly: true,
  // },
  // {
  //   label: "Banners",
  //   url: "/admin/banners",
  //   adminOnly: true,
  // },
  { label: "About Us", url: "/about-us", adminOnly: false },
  { label: "Contact Us", url: "/", adminOnly: false },
  // { label: "Contact Us", url: "/contact-us", adminOnly: false },
  // { label: "Fixtures", url: "/fixtures", adminOnly: false },
];

export const socialLinks = [
  {
    label: "Instagram",
    url: "https://instagram.com/goalnetofficial",
    icon: <FaInstagram />,
  },
  { label: "Facebook", url: "/", icon: <FaFacebookSquare /> },
];
