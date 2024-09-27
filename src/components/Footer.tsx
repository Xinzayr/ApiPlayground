/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

interface FooterProps {
  setPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-white text-black dark:bg-black dark:text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-black dark:bg-white/10 rounded-full">
                <img src="https://cdn.githubraw.com/Xinzayr/ImgSources/54ce91a0/Sources/Asse.png" alt="Asse" width={48} height={48} className="items-center align-middle" />
              </div>
              <h1 className="text-xl font-bold">I&apos;m Xinzaýr</h1>
            </div>

            <div className="flex space-x-3">
              <a href="https://github.com/Xinzayr" aria-label="GitHub">
                <FaGithub className="w-6 h-6 text-black dark:text-white" />
              </a>
              <a href="mailto:science-preppy-yam@duck.com?subject=Te%20puedo%20ayudar&body=Hola,%20vi%20tu%20perfil%20y%20me%20gust%C3%B3%20mucho.%20Si%20est%C3%A1s%20buscando%20ayuda%20o%20quieres%20aprender%20m%C3%A1s,%20puedo%20ayudarte%20con%20eso.%20Para%20m%C3%AD%20ser%C3%ADa%20un%20placer."
                aria-label="Enviar correo">
                <FaEnvelope className="w-6 h-6 text-black dark:text-white" />
              </a>
            </div>
          </div>

          <div className="flex space-x-6">
            <ul>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  onClick={() => setPage('Discord')}
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  onClick={() => setPage('Contact')}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400"
                  onClick={() => setPage('About')}
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-black dark:border-white mt-6 pt-4">
          <p>© 2024 Xinzaýr - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
