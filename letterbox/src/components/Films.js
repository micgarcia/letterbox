import React, {useEffect} from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import '../Films.css';

const Films = () => {

  const [trendingPics, setTrendingPics] = useState([]);
  const [trendingIDs, setTrendingIDs] = useState([]);
  const [currentPics, setCurrentPics] = useState([]);
  const [currentIDs, setCurrentIDs] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=5ea30c3df8f6f36a3bae33585f1396c7', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let i = 0; i < 20; i++) {
          console.log(response);
          setTrendingIDs((prevIDs) => [...prevIDs, response.results[i].id]);
          setTrendingPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)])
        }
      })

      fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=53&with_watch_monetization_types=flatrate', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response)
      })

  },[])
  //Change genre values to genre codes
  return (
    <div className="filmsPage">
      <Navbar />
      <div className="filmsContent">
        <div className="filters">
          <label htmlFor="genres">Genres</label>
          <select name="genres" id="genres">
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </select>

          <label htmlFor="year">Sort By Recent</label>

          <label htmlFor="popularity">Sort By Popularity</label>

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