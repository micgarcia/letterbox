import React, {useEffect} from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
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

  /* fetches backdrop image for Nope */
  useEffect(() => {
    const fetchMovie = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/' + from + '?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US', {mode: 'cors'});
      const json = await data.json();

      setMovie(json);
    }
    fetchMovie();

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
          </div>
          <button onClick={handleClick}>Add to Watched</button>
          <div className="movieStream">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Info;