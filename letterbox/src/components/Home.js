import React, {useEffect} from 'react';
import {useState} from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';

const Home = () => {
  const [backdropUrl, setBackdropUrl] = useState('');
  const [trendingUrl, setTrendingUrl] = useState([]);
  const [trendingID, setTrendingID] = useState([]);

  useEffect(() => {
    /* Supposed to fetch poster urls for trending movies */
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let i = 0; i < 20; i++) {
          if (response.results[i].popularity < 3000) {
            setTrendingUrl((prevUrls) => [...prevUrls, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
            setTrendingID((prevIDs) => [...prevIDs, response.results[i].id]);
          }
        }
      })
  }, [])


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
          <Link to='/info' state={{ from: trendingID[0]}}><img src={trendingUrl[0]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[1]}}><img src={trendingUrl[1]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[2]}}><img src={trendingUrl[2]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[3]}}><img src={trendingUrl[3]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[4]}}><img src={trendingUrl[4]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[5]}}><img src={trendingUrl[5]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[6]}}><img src={trendingUrl[6]} alt="" /></Link>
          <Link to='/info' state={{ from: trendingID[7]}}><img src={trendingUrl[7]} alt="" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Home;