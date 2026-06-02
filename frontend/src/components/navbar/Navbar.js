import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaTrophy, FaUsers, FaVideo, FaNewspaper, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <span>🏏</span>
            <span>Cricket Tournament</span>
          </Link>

          {/* Main Navigation */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li><Link to="/" className="hover:text-gray-200 flex items-center space-x-1"><FaHome /> <span>Home</span></Link></li>
            <li><Link to="/tournaments" className="hover:text-gray-200 flex items-center space-x-1"><FaTrophy /> <span>Tournaments</span></Link></li>
            <li><Link to="/teams" className="hover:text-gray-200 flex items-center space-x-1"><FaUsers /> <span>Teams</span></Link></li>
            <li><Link to="/matches" className="hover:text-gray-200 flex items-center space-x-1"><FaVideo /> <span>Matches</span></Link></li>
            <li><Link to="/news" className="hover:text-gray-200 flex items-center space-x-1"><FaNewspaper /> <span>News</span></Link></li>
            <li><Link to="/gallery" className="hover:text-gray-200 flex items-center space-x-1"><FaVideo /> <span>Gallery</span></Link></li>
          </ul>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {auth ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-200">
                  <FaUser />
                  <span>{auth.firstName}</span>
                </Link>
                {auth.role === 'admin' && (
                  <Link to="/admin" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Admin</Link>
                )}
                <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-gray-200">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center space-x-1 hover:text-gray-200">
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
