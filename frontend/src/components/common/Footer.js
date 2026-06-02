import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">🏏 Cricket Tournament</h3>
            <p className="text-gray-400">Your ultimate destination for local cricket tournaments</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/tournaments" className="hover:text-white">Tournaments</Link></li>
              <li><Link to="/teams" className="hover:text-white">Teams</Link></li>
              <li><Link to="/players" className="hover:text-white">Players</Link></li>
              <li><Link to="/matches" className="hover:text-white">Matches</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Content</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/news" className="hover:text-white">News</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link to="/" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <hr className="border-gray-700 mb-8" />
        <div className="text-center text-gray-400">
          <p>&copy; 2026 Local Cricket Tournament Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
