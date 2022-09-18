import React, {useEffect} from 'react';
import {useState} from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import '../Info.css';
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from './utils/firebase.js';
import { getAuth } from "firebase/auth";

const Info = () => {
  const location = useLocation();
  const { from } = location.state;
  const [movie, setMovie] = useState({});
  const [streams, setStreams] = useState({});
  const [streamNames, setStreamNames] = useState([]);
  const [streamPics, setStreamPics] = useState([]);

  /* fetches backdrop image for Nope */
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/' + from + '?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US', {mode: 'cors'});
      const json = await data.json();

      setMovie(json);
    }
    fetchMovie();

  }, [])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/' + from + '/watch/providers?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        setStreams(response.results.US);
        for (let i = 0; i < 3; i++) {
          if (response.results.US.flatrate[i]) {
            setStreamNames((prevNames) => [...prevNames, response.results.US.flatrate[i].provider_name]);
            setStreamPics((prevPics) => [...prevPics, 'https://image.tmdb.org/t/p/original' + (response.results.US.flatrate[i].logo_path)]);
          }
        }
        for (let i = 0; i < 4; i++) {
          if (response.results.US.rent[i]) {
            setStreamNames((prevNames) => [...prevNames, response.results.US.rent[i].provider_name]);
            setStreamPics((prevPics) => [...prevPics, 'https://image.tmdb.org/t/p/original' + (response.results.US.rent[i].logo_path)]);
          }
        }
        console.log(response.results.US);
      })
  }, [])

  const handleClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const id = movie.id;
    const url = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    const title = movie.title;

    const moviesRef = doc(db, user.email, "watched");
    updateDoc(moviesRef, {
      movies: arrayUnion(id),
      posters: arrayUnion(url),
      titles: arrayUnion(title)
    })

    const added = document.createElement('div');
    added.setAttribute('id','addedWatched');
    added.innerHTML = 'Added!';
    const button = document.getElementById('watchButton');
    const movieText = document.querySelector('.movieText');
    movieText.insertBefore(added, button);
  }

  const addFuture = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const id = movie.id;
    const url = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    const title = movie.title;

    const futureRef = doc(db, user.email, "future");
    updateDoc(futureRef, {
      movies: arrayUnion(id),
      posters: arrayUnion(url),
      titles: arrayUnion(title)
    })

    const added = document.createElement('div');
    added.setAttribute('id','addedFuture');
    added.innerHTML = 'Added!';
    const button = document.getElementById('futureButton');
    const movieText = document.querySelector('.movieText');
    movieText.insertBefore(added, button);
  }


  return (
    <div className="infoPage">
      <Navbar />
      <div className="infoContent">
        <div className="backdrop">
          <img src={'https://image.tmdb.org/t/p/original' + movie.backdrop_path} alt=''></img>
        </div>
        <div className="movieInfo">
          <div className="movieCover">
            <img src={'https://image.tmdb.org/t/p/original' + movie.poster_path} alt=''></img>
          </div>
          <div className="movieText">
            <p className="title">{movie.title}</p>
            <p className="year">{movie.release_date}</p>
            <p className="runtime">{movie.runtime} minutes</p>
            <p className="tagline">{movie.tagline}</p>
            <p className="description">{movie.overview}</p>
            <button onClick={handleClick} id="watchButton">Add to Watched</button>
            <button onClick={addFuture} id="futureButton">Add to Watch Later</button>
            <div className="movieStream">
              {streamNames.map((name, index) => {
              return (
                <div key={name} id={name}>
                  <img src={streamPics[index]} alt='' key={index}/>
                </div>
              )
              })}
              <div className="source">
                Source: JustWatch
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Info;

/*
<div className="subscription">
  <img className="subLogo" alt='' src={'https://image.tmdb.org/t/p/original' + streams.flatrate[0].logo_path}/>
</div>

*/