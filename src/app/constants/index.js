import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

export const headerLinks = [
  { label: "Home", url: "/", adminOnly: false },
  { label: "Posts", url: "/admin", adminOnly: true },
  {
    label: "Categories",
    url: "/admin/categories",
    adminOnly: true,
  },
  { label: "About Us", url: "/about-us", adminOnly: false },
  { label: "Contact Us", url: "/contact-us", adminOnly: false },
  { label: "Fixtures", url: "/fixtures", adminOnly: false },
];

export const socialLinks = [
  {
    label: "Instagram",
    url: "https://instagram.com/goalnetofficial",
    icon: <FaInstagram />,
  },
  { label: "Facebook", url: "/", icon: <FaFacebookSquare /> },
];

export const images = [
  "/assets/images/messi (2).jpg",
  "/assets/images/messi (1).jpg",
  "/assets/images/messi (3).jpg",
  "/assets/images/pexels-todd-trapani.jpg",
  "/assets/images/lion.jpg",
];
