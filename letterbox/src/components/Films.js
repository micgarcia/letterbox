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
          setCurrentIDs((prevIDs) => [...prevIDs, response.results[i].id]);
          setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)])
        }
      })
  },[])

  const sortPop = () => {
    setCurrentIDs([]);
    setCurrentPics([]);

    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let i = 0; i < 20; i++) {
          setCurrentIDs((prevIDs) => [...prevIDs, response.results[i].id]);
          setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
        }
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2', {mode: 'cors'})
          .then(function(json) {
            return json.json();
          })
          .then(function(data) {
            for (let i = 0; i < 20; i++) {
              setCurrentIDs((prevIDs) => [...prevIDs, data.results[i].id]);
              setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + data.results[i].poster_path)]);
            }
          })
      })
  }

  const sortRecent = () => {
    setCurrentIDs([]);
    setCurrentPics([]);

    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&year=2022&vote_average.gte=6', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let i = 0; i < 20; i++) {
          setCurrentIDs((prevIDs) => [...prevIDs, response.results[i].id]);
          setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
        }

      })
  }

  const sortGenre = () => {
    let selectElement = document.querySelector('#genres');
    let genre = selectElement.options[selectElement.selectedIndex].value;
    setCurrentIDs([]);
    setCurrentPics([]);

    for (let i = 1; i < 5; i++) {
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + i + '&vote_average.gte=6&with_genres=' + genre, {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        console.log(response);
        for (let j = 0; j < 20; j++) {
          if (response.results[j].original_language === 'en') {
            setCurrentIDs((prevIDs) => [...prevIDs, response.results[j].id]);
            setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[j].poster_path)]);
          }
        }
      })

    }
    /*
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=6&with_genres=' + genre, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
      for (let i = 0; i < 20; i++) {
        if (response.results.original_language === 'en') {
          setCurrentIDs((prevIDs) => [...prevIDs, response.results[i].id]);
          setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
        }
      }
      fetch('https://api.themoviedb.org/3/discover/movie?api_key=5ea30c3df8f6f36a3bae33585f1396c7&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&vote_average.gte=6&with_genres=' + genre, {mode: 'cors'})
          .then(function(json) {
            return json.json();
          })
          .then(function(data) {
            for (let i = 0; i < 20; i++) {
              console.log(response.results[i].original_language)
              if (response.results[i].original_language === 'en') {
                setCurrentIDs((prevIDs) => [...prevIDs, response.results[i].id]);
                setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[i].poster_path)]);
              }
            }
          })
    })
    */
  }

  //Change genre values to genre codes
  return (
    <div className="filmsPage">
      <Navbar />
      <div className="filmsContent">
        <div className="filters">
          <label htmlFor="genres">Genres</label>
          <select name="genres" id="genres" onChange={sortGenre}>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>

          <label htmlFor="year" onClick={sortRecent}>Sort By Recent</label>

          <label htmlFor="popularity" onClick={sortPop}>Sort By Popularity</label>

        </div>
        <div className="resultsTitle">

        </div>
        <div className="resultsGrid">
          {currentIDs.map((id, index) => {
            return (
              <Link to='/info' state={{ from: id}} key={id}>
                <img src={currentPics[index]} alt='' key={index}/>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Films;