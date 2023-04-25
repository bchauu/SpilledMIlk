import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { MovieCard } from '../wrapper/MovieCard';
import { MovieCardInfo } from '../wrapper/MovieCardInfo';
import PlatformLogo from './PlatformLogo';

const Movie = (props) => {
    const [hover, setHover] = useState(false);
    let movie = props.movie
    const movieButon = props.methodButton;
    const method = props.method;

    if (method != 'post') { // change based on retreiving a list or searching. list is nested
        movie = props.movie.movie;
    } 

    const streamPlatform = Object.keys(movie.streamingInfo.us);

    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };

    return (
        <div className='allInfo'>
            {method == 'post' 
            ? <button className='favoritesButton' onClick={() => movieButon(movie)}>Add to Favorites</button>
            : <button className='favoritesButton' onClick={() => movieButon(props.movie._id)}>Remove From Favorites</button>
            }
            <MovieCard key={movie._id}>
                 <div ></div>
                {hover
                    ? <Link to={`/movie/${movie.tmdbId}`} state ={{data: movie, user: props.currentUser}}> 
                        <img src={movie.posterURLs.original} onMouseLeave={handleMouseLeave}></img>
                    </Link> //when hover
                    : <img src={movie.posterURLs.original} onMouseEnter={handleMouseEnter} ></img> //initial state
                }
            </MovieCard>
            <MovieCardInfo>
                <Link to={`/movie/${movie.tmdbId}`} state ={{data: movie, user: props.currentUser}}>
                    <p>{movie.title}</p>
                </Link>
                <div className='platforms'>
                    {streamPlatform?.map((platform, index) => (
                        <PlatformLogo platform={platform} key={index}></PlatformLogo> 
                    ))}
                </div>
            </MovieCardInfo>
        </div>
    )
}

export default Movie;