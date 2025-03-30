import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              This is a test environment for Impact.com affiliate tracking integration
            </p>
          </div>
          <div className="text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Impact.com Test Store</p>
            <p className="text-xs mt-1">No real transactions are processed</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;