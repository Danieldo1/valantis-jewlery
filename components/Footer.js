'use client';

import React from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="logo" height={25} width={25} />
              <p className="font-black text-xl">ValantisJewelery</p>
            </div>
          </span>
        </a>
        <p className="text-sm  text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} ValantisJewelery Store
          <span className="text-gray-600 ml-1 cursor-pointer hover:underline text-center">
            @ValantisJewelery
          </span>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500 cursor-pointer hover:scale-110">
            <FaFacebookF />
          </a>
          <a className="ml-3 text-gray-500 cursor-pointer hover:scale-110">
            <FaTwitter />
          </a>
          <a className="ml-3 text-gray-500 cursor-pointer hover:scale-110">
            <FaInstagram />
          </a>
          <a className="ml-3 text-gray-500 cursor-pointer hover:scale-110">
            <FaPinterestP />
          </a>
        </span>
      </div>
      <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
        <nav className="flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900 cursor-pointer hover:underline">
            About Us
          </a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer hover:underline">
            Contact Us
          </a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer hover:underline">
            Privacy Policy
          </a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer hover:underline">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
