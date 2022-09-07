import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        Letterbox
      </Link>
      <Link to="/login" className="loginLink">
        Sign In
      </Link>
      <Link to="/create" className="createLink">
        Create Account
      </Link>
      <Link to="/films" className="filmsLink">
        Films
      </Link>
    </div>
  )
}

export default Navbar;