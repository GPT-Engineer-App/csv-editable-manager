import React from 'react';
import { FaDownload } from 'react-icons/fa';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <header className="bg-primary-color text-white p-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-8" />
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white">For Whom</a></li>
          <li><a href="#" className="text-white">Features</a></li>
          <li><a href="#" className="text-white">How It Works</a></li>
        </ul>
      </nav>
      <button className="btn btn-secondary">
        <FaDownload /> Download
      </button>
    </header>
  );
};

export default Header;