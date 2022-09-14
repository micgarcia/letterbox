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
      <div className="watchedTitle">
        Watched Movies
      </div>
      <div className="watchedMovies">
      {id.map((ID, index) => {
          return (
            <div key={ID} className='movieCont' id={ID}>
              <img src={urls[index]} alt=''/>
            </div>
          )
        })}
      </div>
      <div className="futureTitle">
        Watch Later Movies
      </div>
      <div className="futureMovies">
      {futureId.map((ID, index) => {
          return (
            <div key={ID} className='movieCont' id={ID}>
              <img src={futureUrls[index]} alt=''/>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default Account;
