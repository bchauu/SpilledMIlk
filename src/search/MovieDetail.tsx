import React from 'react';
import { useLocation } from 'react-router-dom';

const MovieDetail: React.FC = (props) => {

    const location = useLocation();
    const movieDetails = location.state.data;
    return(
        <div>
            <h1>Movie Details</h1>
            <p>{movieDetails.seasonCount}</p>
            <p> {movieDetails.title}</p>
            <p>{movieDetails.tmdbId}</p>
            <p>{movieDetails.overview}</p>
            <img src={movieDetails.posterURLs.original}></img>
        </div>
    )
}

export default MovieDetail;