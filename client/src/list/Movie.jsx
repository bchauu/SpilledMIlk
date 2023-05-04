import { Link } from "react-router-dom";
import React, { useState } from "react";
import { MovieCard } from "../wrapper/MovieCard";
import { MovieCardInfo } from "../wrapper/MovieCardInfo";
import PlatformLogo from "./PlatformLogo";

const Movie = (props) => {
  let movie = props.movie;
  const { methodButton: movieButon, method } = props; //keeps reusable regardless of add or delete

  if (method != "post") {
    // change based on retreiving a list or searching. list is nested
    movie = props.movie.movie;
  }

  const streamPlatform = Object.keys(movie.streamingInfo?.us); //an array from object keys

  return (
    <div className="allInfo">
      {method == "post" ? (
        <button className="favoritesButton" onClick={() => movieButon(movie)}> 
          Add to Favorites
        </button>
      ) : (
        <button
          className="favoritesButton"
          onClick={() => movieButon(props.movie._id)}
        >
          Remove From Favorites
        </button>
      )}
      <MovieCard key={movie._id}>
        <div></div>
        <Link
              to={`/movie/${movie.tmdbId}`}
              state={{ data: movie, user: props.currentUser }}
            >
              <img
                src={movie.posterURLs.original}
              ></img>
            </Link> 
      </MovieCard>
      <MovieCardInfo>
        <Link
          to={`/movie/${movie.tmdbId}`}
          state={{ data: movie, user: props.currentUser }}
        >
          <p>{movie.title}</p>
        </Link>
        <div className="platforms">
          {streamPlatform?.map((platform, index) => (
            <PlatformLogo platform={platform} key={index}></PlatformLogo>
          ))}
        </div>
      </MovieCardInfo>
    </div>
  );
};

export default Movie;
