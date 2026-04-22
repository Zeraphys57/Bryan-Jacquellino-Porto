import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiFigma } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-10  px-15">
      <div className="container h-[20vh] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">© 2025 Bryan Jacquellino</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Designed and built with care.</p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Elsewhere</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://figma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Figma
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Contact</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a
                href="https://wa.me/+6281351958200"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Message on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-6 text-gray-600 dark:text-gray-400">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200"
        >
          <FiFigma size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://wa.me/+6281351958200"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
