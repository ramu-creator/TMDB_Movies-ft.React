import React, { useState } from 'react'
import "../styles/style.css"
import { useLocation } from 'react-router-dom'
import YouTube from 'react-youtube';

const ParticularMovie = () => {
    const location = useLocation();
    console.log(location);
    const movie = location.state.item;
    // console.log(movie);
    const [trailer,setTrailer] = useState("");
    async function getTrailers(id){
        fetch(`https://api.themoviedb.org/3/movie/ ${id}/videos?api_key=caa70c793d4d1bd32591a3325ee86e3e`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setTrailer(data.results[0].key);
        }).catch((error) => console.error('Error fetching data:', error));

    }
     
  return (
    <>
      <div id="movie-container">
        <h1 id='container-title'>About The Movie</h1>
        <img id="movie-backdrop" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
        <div id="movie-details">
            <h2 id="movie-title">{movie.title}</h2>
            <p id="movie-overview">{movie.overview}</p>
            <p  id="release-date">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
            <p id="rating">Rating: {movie.vote_average}</p>
            <button id="trailer-button" onClick={()=>getTrailers(movie.id)}>Play Trailer</button>
            <div id="trailer-container">
                {
                    trailer && <YouTube videoId={trailer} />    
                }
            </div>
        </div>
      </div>
    </>
  )
}

export default ParticularMovie
