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
  const [futureId, setFutureId] = useState([]);
  const [futureUrls, setFutureUrls] = useState([]);
  const [futureTitles, setFutureTitles] = useState([]);


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

      const futureRef = doc(db, user.email, 'future');
      const futureSnap = await getDoc(futureRef);
      const futureData = futureSnap.data();
      console.log(futureData);

      for (let i = 0; i < futureData.movies.length; i++) {
        setFutureId(oldArray => [...oldArray, futureData.movies[i]]);
        setFutureUrls(oldArray => [...oldArray, futureData.posters[i]]);
        setFutureTitles(oldArray => [...oldArray, futureData.titles[i]]);
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
      Watched Movies
      {id.map((ID, index) => {
          return (
            <div key={ID} className='movieCont'>
              <img src={urls[index]} alt=''/>
              <div key={index} className='movieTitle'>{titles[index]}</div>
            </div>
          )
        })}
      </div>
      <div className="futureMovies">
      Watch Later Movies
      {futureId.map((ID, index) => {
          return (
            <div key={ID} className='movieCont'>
              <img src={futureUrls[index]} alt=''/>
              <div key={index} className='movieTitle'>{futureTitles[index]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default Account;
