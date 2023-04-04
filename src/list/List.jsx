import React, { useState, useEffect, useRef } from 'react';
import { ListCard } from '../wrapper/ListCard';
import { MovieCard } from '../wrapper/MovieCard';
import { Link } from 'react-router-dom';

const List = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3434/getMovies', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            setMovieList([...data]);
        })
    }, [])

    const removeMovie = (id) => {
        console.log(id)
        fetch('http://localhost:3434/deleteMessage', {
            method: 'DELETE',
            body: JSON.stringify({
              data: id
            }),
            headers: { 'Content-Type': 'application/json' }
          });

          setMovieList([...movieList.filter(movie => movie._id != id)])
    }

    return (
    <div className='page'>
        <div className='header'>
            <h1>Spilled Milk</h1>
        </div>
        <h2>Favorites List</h2>
        <ListCard>
            {movieList.map(movie => (
                <MovieCard key={movie._id}>
                    <div>
                        <h1>
                             {movie.movie.title} 
                             <button onClick={() => removeMovie(movie._id)}>Remove From Favorites</button>
                        </h1>
                    </div>
                    <img src={movie.movie.backdropURLs.original}></img>
                    <h2>Overview:</h2>
                    <p>{movie.movie.overview}</p>
                    <h2> Type: </h2>
                        <p>{movie.movie.type}</p>
                    <Link to={`/movie/${movie.movie.tmdbId}`} state ={{data: movie.movie}}> See More... </Link>
                </MovieCard>
                // <h1>WOrking</h1>
            ))}
        </ListCard>

    </div>
    )
}

export default List;