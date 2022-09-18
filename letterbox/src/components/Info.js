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
    const fetchStream = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/' + from + '/watch/providers?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'});
      const json = await data.json();

      setStreams(json.results.US);
      console.log(json.results.US);
    }
    fetchStream();
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
                {streams.flatrate[0] !== undefined &&
                  <div className="subscription">
                    <img className="subLogo" alt='' src={'https://image.tmdb.org/t/p/original' + streams.flatrate[0].logo_path}/>
                  </div>
                }
                {streams.flatrate[1] !== undefined &&
                  <div className="subscription">
                    <img className="subLogo" alt='' src={'https://image.tmdb.org/t/p/original' + streams.flatrate[1].logo_path}/>
                  </div>
                }
                {streams.rent[0] !== undefined &&
                  <div className="rent">
                    <img className="rentLogo" alt='' src={'https://image.tmdb.org/t/p/original' + streams.rent[0].logo_path}/>
                  </div>
                }
                {streams.rent[1] !== undefined &&
                  <div className="rent">
                    <img className="rentLogo" alt='' src={'https://image.tmdb.org/t/p/original' + streams.rent[1].logo_path}/>
                  </div>
                }
                {streams.rent[2] !== undefined &&
                  <div className="rent">
                    <img className="rentLogo" alt='' src={'https://image.tmdb.org/t/p/original' + streams.rent[2].logo_path}/>
                  </div>
                }
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