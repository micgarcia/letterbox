import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";


const Navbar = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return(
      <div id="navbar">
      <Link to="/" id="logo">
        Letterbox
      </Link>
      <Link to="/account" id="accountLink">
        {user.email}
      </Link>
      <Link to="/films" id="filmsLink">
        Films
      </Link>
    </div>
    )
  } else {
    return (
      <div id="navbar">
        <Link to="/" id="logo">
          Letterbox
        </Link>
        <Link to="/login" id="loginLink">
          Sign In
        </Link>
        <Link to="/create" id="createLink">
          Create Account
        </Link>
        <Link to="/films" id="filmsLink">
          Films
        </Link>
      </div>
    )
  }
}

export default Navbar;