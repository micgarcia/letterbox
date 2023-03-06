import React from 'react';
import Navbar from './Navbar.js';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from './utils/firebase.js';
import '../Create.css';


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
        setDoc(doc(db, user.email, 'future'), {
          movies: []
        });

        const created = document.createElement('div');
        created.setAttribute('id', 'created');
        created.innerHTML = 'Account Created Successfully!';
        const form = document.querySelector('.createFormCont');
        form.appendChild(created);
        userEmail.value = '';
        userPassword.value = '';
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })



  }

  return (
    <div className="createAccountPage">
      <Navbar />
      <div className="createContent">
        <div className="createInfo">
          <div className="createTitle">
            Create Letterbox Account
          </div>
          <div className="createInstructions">
            Please Enter Your Email Address and Password Below.
          </div>
        </div>
        <div className="createFormCont">
          <form action="GET">
            <label htmlFor="userEmail">Enter E-mail:</label>
            <input type="email" id="userEmail" name="userEmail"/>
            <label htmlFor="userPassword">Enter Password</label>
            <input type="password" id="userPassword" name="userPassword"/>
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create;