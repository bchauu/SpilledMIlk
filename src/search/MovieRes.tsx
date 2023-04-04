import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { movieResult } from "../movieResult.model";
import { MovieCard } from "../wrapper/MovieCard";
import { ListCard } from "../wrapper/ListCard";

interface MovieResProp {
    movieResult: movieResult[];
    onAddUserMovie: (movie: any) => void;
}

const MovieRes: React.FC<MovieResProp> = (props) => {
    const addMovieToList = (movie: {}) => {
        console.log(movie);
        props.onAddUserMovie(movie)
    }

    return (
        <ListCard className="movieCard">
            {props.movieResult.map(movie => (
                <MovieCard key={movie.tmdbId}>
                    <div>
                        <h1>
                             {movie.title} 
                        <button onClick={() => addMovieToList(movie)}>Add to Favorite</button>
                        </h1>
                    </div>

                    <img src={movie.backdropURLs.original}></img>
                    <h2>Overview:</h2>
                    <p>{movie.overview}</p>
                    <h2> Type: </h2>
                        <p>{movie.type}</p>
                    <Link to={`/movie/${movie.tmdbId}`} state ={{data: movie}}> See More... </Link>
                </MovieCard>
            ))}
        </ListCard>
    )
}

export default MovieRes;