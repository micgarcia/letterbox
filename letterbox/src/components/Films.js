import React, {useEffect} from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import '../Films.css';

const Films = () => {

  const [trendingPics, setTrendingPics] = useState([]);
  const [trendingIDs, setTrendingIDs] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let i = 0; i < 19; i++) {
          setTrendingIDs((prevIDs) => [...prevIDs, response.results[i].id]);
          setTrendingPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)])
        }
      })
  },[])

  return (
    <div className="filmsPage">
      <Navbar />
      <div className="filmsContent">
        <div className="filters">

        </div>
        <div className="resultsTitle">

        </div>
        <div className="resultsGrid">
          {trendingIDs.map((id, index) => {
            return (
              <Link to='/info' state={{ from: id}} key={id}>
                <img src={trendingPics[index]} alt='' key={index}/>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Films;