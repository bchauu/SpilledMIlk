import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import MovieItem from "./MovieItem";

interface MovieResProp {
    movieResult: {tmdbId: number, title: string, seasonCount: number}[];
}


const MovieRes: React.FC<MovieResProp> = (props) => {

    return (
        <div>
            {props.movieResult.map(movie => (
                <li key={movie.tmdbId}>{movie.title}
                    <p>{movie.seasonCount}</p>
                    {/* <Link> See More... </Link> */}
                </li>
            ))}
        </div>
    )
}

export default MovieRes;