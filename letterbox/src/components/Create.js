import React from 'react';
import Navbar from './Navbar.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from './utils/firebase.js';

const Create = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        setDoc(doc(db, user.email, 'watched'), {
          movies: []
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })



  }

  return (
    <div className="createAccount">
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

export default Create;