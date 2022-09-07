import React, {useEffect} from 'react';
import {useState} from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const [backdropUrl, setBackdropUrl] = useState('');
  const [trendingUrl, setTrendingUrl] = useState([]);
  useEffect(() => {
    /* fetches backdrop image for Nope */
    fetch('https://api.themoviedb.org/3/movie/762504?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        setBackdropUrl('https://image.tmdb.org/t/p/original' + response.backdrop_path)
    });

    /* Supposed to fetch poster urls for trending movies */
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        for (let i = 0; i < 20; i++) {
          if (response.results[i].popularity < 2500) {
            setTrendingUrl((prevUrls) => [...prevUrls, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
          }
        }
        console.log(trendingUrl);
      })
  }, [])


  return (
    <div id='homePage'>
      <div className="navBar">
        {<Navbar />}
      </div>
      <div className="homeContent">
        <div className="picCont">
          <img src={backdropUrl} alt="" />
        </div>
        <div className="siteDesc">
          Track films you've watched. <br/>
          Save those you want to see.
        </div>
        <div className="trendingCont">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home;