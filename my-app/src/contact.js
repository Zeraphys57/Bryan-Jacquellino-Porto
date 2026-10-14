/* Contact details used across the site — change them here only. */
export const WHATSAPP_NUMBER = "6281351958200"; // wa.me format: country code, no "+"
export const EMAIL = "jacquellinobryan@gmail.com";

export const SOCIALS = {
  github: "https://github.com/Zeraphys57",
  instagram: "https://www.instagram.com/bryanjacquellino/",
};

export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
