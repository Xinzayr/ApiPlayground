'use client';

import React, { useState } from 'react';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'; // Importar componentes de NextUI

interface HeaderProps {
  setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-black">
      <div className="flex items-center">
        <a
          id="header-txt"
          href="/"
          className="text-xl font-bold text-black dark:text-white"
        >
          ApiPlayground
        </a>
      </div>


      <div className="md:hidden">
        <Button

          onClick={toggleMenu}
          className="text-black dark:text-white bg-transparent hover:bg-white/10 dark:hover:bg-white/20"
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            ></path>
          </svg>
        </Button>
      </div>


      <ul
        className={`${isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0 absolute md:relative bg-transparent p-4 md:p-0 top-16 md:top-0 left-0 right-0 md:shadow-none z-10 md:z-0`}
      >
        <li>
          <Button
        onClick={() => setPage('HomePage')}
        className="text-black dark:text-white w-full text-left md:w-auto md:text-center rounded-lg hover:bg-white/10"
          >
        Home
          </Button>
        </li>
        <li>
          <Button
        onClick={() => setPage('')}
        className="text-black dark:text-white w-full text-left md:w-auto md:text-center rounded-lg hover:bg-white/10"
          >
        Undefined
          </Button>
        </li>
        <li>
          <Button
        onClick={() => setPage('')}
        className="text-black dark:text-white w-full text-left md:w-auto md:text-center rounded-lg hover:bg-white/10"
          >
        Undefined
          </Button>
        </li>
        <li>
          <Button
        onClick={() => setPage('Undefined')}
        className="text-black dark:text-white w-full text-left md:w-auto md:text-center rounded-lg hover:bg-white/10"
          >
        Undefined
          </Button>
        </li>

        <li>
          <Dropdown>
        <DropdownTrigger>
          <Button className="text-black dark:text-white w-full md:w-auto md:text-center rounded-lg">
            Proyectos
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Proyectos" variant="light" className="w-full p-3 bg-white dark:bg-black text-black dark:text-white rounded-md">
          <DropdownItem key="proyecto1" onClick={() => setPage('Proyecto1')}>
            Proyecto 1
          </DropdownItem>
          <DropdownItem key="JsonProject" onClick={() => setPage('JsonProject')}>
            Proyecto 2
          </DropdownItem>
          <DropdownItem key="PokeProject" onClick={() => setPage('PokeProject')}>
            PokeProject
          </DropdownItem>
        </DropdownMenu>
          </Dropdown>
        </li>
      </ul>

      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Header;
