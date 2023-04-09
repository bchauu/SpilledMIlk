import React from "react";
import { movieResult } from "../movieResult.model";
import { ListCard } from "../wrapper/ListCard";
import Movie from "../list/Movie";

interface MovieResProp {
    movieResult: movieResult[];
    onAddUserMovie: (movie: any) => void;
}

const MovieRes: React.FC<MovieResProp> = (props) => {

    const method = 'post';

    const addMovieToList = (movie: {}) => {
        console.log(movie);
        props.onAddUserMovie(movie)
    }

    return (
        <ListCard className="movieCard">
            {props.movieResult.map(movie => (
                <Movie key={movie.tmdbId} movie={movie} methodButton={addMovieToList} method={method}></Movie>
            ))}
        </ListCard>  
    )
}

export default MovieRes;