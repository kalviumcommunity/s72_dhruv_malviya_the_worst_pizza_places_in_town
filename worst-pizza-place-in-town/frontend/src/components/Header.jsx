// client/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPizzaSlice, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <FaPizzaSlice className="logo-icon" />
            <h1>Crusty's Worst Pizza Reviews</h1>
          </Link>
          <p className="tagline">Where bad pizza gets the attention it deserves</p>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            {user ? (
              <>
                <li><Link to="/add-pizza-place">Add Pizza Place</Link></li>
                <li><Link to="/profile" className="user-link"><FaUser /> {user.username}</Link></li>
                <li><button onClick={onLogout} className="logout-btn"><FaSignOutAlt /> Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;