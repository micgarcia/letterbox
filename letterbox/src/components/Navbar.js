import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';


const Navbar = () => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
        console.log(user);
        setLogged(true);
      } else {
        setLogged(false);
      }
    })
  }, [logged])

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(auth);
    })
  }


  if (logged) {
    return(
      <div id="navbar">
      <Link to="/" id="logo">
        Letterbox
      </Link>
      <Link to="/account" id="accountLink">
        {user.email}
      </Link>
      <div className='logoutLink' onClick={logout}>Logout</div>
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