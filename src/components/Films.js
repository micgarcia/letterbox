import React, {useEffect} from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../Films.css';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {ThreeDots} from "react-loader-spinner";

const Films = () => {

  const [currentPics, setCurrentPics] = useState([]);
  const [currentIDs, setCurrentIDs] = useState([]);

  const setTrending = () => {
    for (let i = 1; i < 5; i++) {
      trackPromise(fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=' + process.env.REACT_APP_MOVIE_API_KEY + '&page=' + i, {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let j = 0; j < 20; j++) {
          if (response.results[j].original_language === 'en') {
            setCurrentIDs((prevIDs) => [...prevIDs, response.results[j].id]);
            setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[j].poster_path)]);
          }
        }
      }))
    }
    const title = document.querySelector('.resultsTitle');
    title.innerHTML = 'Trending Movies';
  }

  useEffect(() => {
    setTrending();
  },[])

  const sortPop = () => {
    setCurrentIDs([]);
    setCurrentPics([]);

    for (let i = 1; i < 5; i++) {
      trackPromise(fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_MOVIE_API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + i, {mode: 'cors'})
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
      }))
    }
    const title = document.querySelector('.resultsTitle');
    title.innerHTML = 'Popular Movies';
  }

  const sortRecent = () => {
    setCurrentIDs([]);
    setCurrentPics([]);

    for (let i = 1; i < 5; i++) {
      trackPromise(fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_MOVIE_API_KEY + '&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=' + i + '&year=2022&vote_average.gte=6', {mode: 'cors'})
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
      }))
    }
    const title = document.querySelector('.resultsTitle');
    title.innerHTML = 'Recent Movies';
  }

  const sortGenre = () => {
    let selectElement = document.querySelector('#genres');
    let genre = selectElement.options[selectElement.selectedIndex].value;
    let genreName = selectElement.options[selectElement.selectedIndex].innerHTML;
    setCurrentIDs([]);
    setCurrentPics([]);

    for (let i = 1; i < 5; i++) {
      trackPromise(
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_MOVIE_API_KEY + '&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + i + '&vote_average.gte=6&with_genres=' + genre, {mode: 'cors'})
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
      )
    }
    const title = document.querySelector('.resultsTitle');
    title.innerHTML = genreName + ' Movies';
  }

  const handleSearch = () => {
    setCurrentIDs([]);
    setCurrentPics([]);
    const query = document.getElementById('search').value;
    if (query === '') {
      return setTrending();
    }
    const title = document.querySelector('.resultsTitle');
    title.innerHTML = query;

    trackPromise(
      fetch('https://api.themoviedb.org/3/search/movie?api_key='+ process.env.REACT_APP_MOVIE_API_KEY +'&language=en-US&query=' + query + '&page=1&include_adult=false', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        for (let j = 0; j < 20; j++) {
          if (response.results[j].original_language === 'en') {
            setCurrentIDs((prevIDs) => [...prevIDs, response.results[j].id]);
            setCurrentPics((prevPics) => [...prevPics, ('https://image.tmdb.org/t/p/original' + response.results[j].poster_path)]);
          }
        }
      })
    )
  }

  const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
      promiseInProgress &&
      <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >
        <ThreeDots type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    );
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

          <label htmlFor="year" onClick={sortRecent} id="year">Sort By Recent</label>

          <label htmlFor="popularity" onClick={sortPop} id="popularity">Sort By Popularity</label>

          <span className="material-symbols-outlined searchIcon">
            search
          </span>
          <input type="text" id="search" onChange={handleSearch}/>

        </div>
        <div className="resultsTitle">

        </div>
        <div className="resultsGrid">
          <LoadingIndicator />
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