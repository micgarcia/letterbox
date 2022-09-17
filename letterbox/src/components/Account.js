import React from 'react';
import Navbar from './Navbar.js';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { db } from './utils/firebase.js';
import '../Account.css';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {ThreeDots} from "react-loader-spinner";


const Account = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [id, setId] = useState([]);
  const [urls, setUrls] = useState([]);
  const [futureId, setFutureId] = useState([]);
  const [futureUrls, setFutureUrls] = useState([]);


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
      setId([]);
      setUrls([]);

      setFutureId([]);
      setFutureUrls([]);

      const docRef = doc(db, user.email, 'watched');
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();

      for (let i = 0; i < userData.movies.length; i++) {
        setId(oldArray => [...oldArray, userData.movies[i]]);
        setUrls(oldArray => [...oldArray, userData.posters[i]]);
      }

      const futureRef = doc(db, user.email, 'future');
      const futureSnap = await getDoc(futureRef);
      const futureData = futureSnap.data();

      for (let i = 0; i < futureData.movies.length; i++) {
        setFutureId(oldArray => [...oldArray, futureData.movies[i]]);
        setFutureUrls(oldArray => [...oldArray, futureData.posters[i]]);
      }

    }
    if (user.email) {
      trackPromise(getData());
    }
  },[user, data])

  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
      promiseInProgress &&
      <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >
        <ThreeDots type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    );
  }

  const handleDelete = async (e) => {

    if (e.target.className.includes('watched')) {
      const docRef = doc(db, user.email, 'watched');
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      let newData = {};
      for (let prop in userData) {
        newData[prop] = [];
        for (let i = 0; i < userData[prop].length; i++) {
          if (i != e.target.id) {
            newData[prop].push(userData[prop][i]);
          }
        }
      }

      await updateDoc(docRef, newData);
      setData(newData);
    } else {
      const docRef = doc(db, user.email, 'future');
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();

      let newData = {};
      for (let prop in userData) {
        newData[prop] = [];
        for (let i = 0; i < userData[prop].length; i++) {
          if (i != e.target.id) {
            newData[prop].push(userData[prop][i]);
          }
        }
      }

      await updateDoc(docRef, newData);
      setData(newData);
    }
  }

  const handleWatched = async (e) => {
    const docRef = doc(db, user.email, 'watched');
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    const futureRef = doc(db, user.email, 'future');
    const futureSnap = await getDoc(futureRef);
    const futureData = futureSnap.data();

    let newData = {};
    for (let prop in userData) {
      newData[prop] = [];
      for (let i = 0; i < userData[prop].length; i++) {
        newData[prop].push(userData[prop][i]);
      }
    }
    for (let prop in futureData) {
      for (let i = 0; i < futureData[prop].length; i++) {
        if (i == e.target.id) {
          newData[prop].push(futureData[prop][i]);
        }
      }
    }
    await updateDoc(docRef, newData);
    setData(newData);

    handleDelete(e);
  }

  return (
    <div className="accountPage">
      <Navbar />
      <div className="watchedTitle">
        Watched Movies
      </div>
      <div className="watchedMovies">
        <LoadingIndicator />
        {id.map((ID, index) => {
            return (
              <div key={ID} className='movieCont' id={ID}>
                <img src={urls[index]} alt=''/>
                <div className="deleteButton material-symbols-outlined watched" onClick={handleDelete} id={index}>delete</div>
              </div>
            )
          })}
      </div>
      <div className="futureTitle">
        Watch Later Movies
      </div>
      <div className="futureMovies">
        <LoadingIndicator />
        {futureId.map((ID, index) => {
            return (
              <div key={ID} className='movieCont' id={ID}>
                <img src={futureUrls[index]} alt=''/>
                <div className="visibilityButton material-symbols-outlined" onClick={handleWatched} id={index}>visibility</div>
                <div className="deleteButton material-symbols-outlined" onClick={handleDelete} id={index}>delete</div>
              </div>
            )
          })}
      </div>
    </div>
  )

}

export default Account;
