import React, {useEffect} from 'react';
import {useState} from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const [backdropUrl, setBackdropUrl] = useState('');
  const [trendingUrl, setTrendingUrl] = useState([]);

  /* fetches backdrop image for Nope */
  fetch('https://api.themoviedb.org/3/movie/762504?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US', {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    setBackdropUrl('https://image.tmdb.org/t/p/original' + response.backdrop_path)
  });

  useEffect(() => {
    /* Supposed to fetch poster urls for trending movies */
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        for (let i = 0; i < 20; i++) {
          if (response.results[i].popularity < 3000) {
            setTrendingUrl((prevUrls) => [...prevUrls, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
          }
        }
      })
  }, [])

  console.log(trendingUrl);

  return (
    <div id='homePage'>
      {<Navbar />}
      <div className="homeContent">
        <div className="picCont">
        </div>
        <div className="siteDesc">
          Track films you've watched. <br/>
          Save those you want to see.
        </div>
        <div className="trendingCont">
          <img src={trendingUrl[0]} alt="" />
          <img src={trendingUrl[1]} alt="" />
          <img src={trendingUrl[2]} alt="" />
          <img src={trendingUrl[3]} alt="" />
          <img src={trendingUrl[4]} alt="" />
          <img src={trendingUrl[5]} alt="" />
          <img src={trendingUrl[6]} alt="" />
          <img src={trendingUrl[7]} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home;