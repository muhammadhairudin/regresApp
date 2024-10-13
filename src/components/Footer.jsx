import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Mini Project Muhammad H</h3>
            <p className="text-sm">  {new Date().getFullYear()} Hak cipta dilindungi.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Baarokallahu Fiik</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;