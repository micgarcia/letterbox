import React from 'react';
import Navbar from './Navbar.js';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from './utils/firebase.js';
import '../Account.css';


const Account = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [id, setId] = useState([]);
  const [urls, setUrls] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
      }
    })
  }, [])

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, user.email, 'watched');
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      console.log(userData);
      setData(data);

      for (let i = 0; i < userData.movies.length; i++) {
        setId(oldArray => [...oldArray, userData.movies[i]]);
        setUrls(oldArray => [...oldArray, userData.posters[i]]);
        setTitles(oldArray => [...oldArray, userData.titles[i]]);
      }
    }
    if (user.email) {
      getData();
    }
  },[user])


  return (
    <div className="accountPage">
      <Navbar />
      <div className="userEmail">
        {user.email}
      </div>
      <div className="watchedMovies">
      {id.map((ID, index) => {
          return (
            <div key={ID} className='movieCont'>
              <img src={urls[index]} alt=''/>
              <div key={index} className='movieTitle'>{titles[index]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default Account;
