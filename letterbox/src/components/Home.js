import React from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div id='homePage'>
      <div className="navBar">
        {<Navbar />}
      </div>
      <div className="homeContent">
        <div className="picCont">
          Movie Picture
        </div>
        <div className="siteDesc">
          Site Description
        </div>
        <div className="trendingCont">
          Trending Movies
        </div>
      </div>
    </div>
  )
}

export default Home;