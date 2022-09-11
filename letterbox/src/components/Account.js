import React from 'react';
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from './utils/firebase.js';


const Account = () => {

  async function loadData() {
    const auth = await getAuth();
    const user = auth.currentUser;

    const docRef = doc(db, user.email, 'watched');
    const docSnap = await getDoc(docRef);
    console.log(docSnap);

    if (docSnap.exists()) {
      return (
        <div className="accountPage">
          <div className="userEmail">
            {user.email}
          </div>
          <div className="watchedMovies">

          </div>
        </div>
      )
    }
  }
  return (
    loadData()
  )
}

export default Account;