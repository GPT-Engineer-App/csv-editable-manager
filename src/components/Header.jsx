import React from 'react';
import { FaDownload } from 'react-icons/fa';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-8" />
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white">Home</a></li>
          <li><a href="#" className="text-white">Clients</a></li>
          <li><a href="#" className="text-white">Analytics</a></li>
          <li><a href="#" className="text-white">Marketing</a></li>
          <li><a href="#" className="text-white">Reports</a></li>
        </ul>
      </nav>
      <button className="btn btn-secondary">
        <FaDownload /> Upgrade
      </button>
    </header>
  );
};

export default Header;