import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { MovieCard } from '../wrapper/MovieCard';

const Movie = (props) => {
    const [hover, setHover] = useState(false);
    let movie = props.movie
    const movieButon = props.methodButton;
    const method = props.method;

    console.log(props.currentUser)

    if (method != 'post') { // change based on retreiving a list or searching. list is nested
        movie = props.movie.movie;
    }

    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };

    return (
        <div>
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
            <Link to={`/movie/${movie.tmdbId}`} state ={{data: movie, user: props.currentUser}}>
                <p>{movie.title}</p>
            </Link>
        </div>
    )
}

export default Movie;