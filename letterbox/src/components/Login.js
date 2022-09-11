import React from 'react';
import Navbar from './Navbar.js';
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";


const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {

      })
      .catch((error) => {
        const errorMessage = error.message;
      })
  }

  return (
    <div className="userLogin">
      <Navbar />
      <form action="GET">
        <label htmlFor="userEmail">Enter E-mail:</label>
        <input type="email" id="userEmail" name="userEmail"/>
        <label htmlFor="userPassword">Enter Password</label>
        <input type="password" id="userPassword" name="userPassword"/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Login;