import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white p-4 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Worst Pizza Places</h3>
            <p className="text-sm">Share your disappointing pizza experiences!</p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
            <Link to="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-300 transition">Terms of Service</Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm">© {new Date().getFullYear()} Worst Pizza Places</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;