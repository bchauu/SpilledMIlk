import React from "react";
import { movieResult } from "../movieResult.model";
import { ListCard } from "../wrapper/ListCard";
import Movie from "../list/Movie";

interface MovieResProp {
  movieResult: movieResult[];
  onAddUserMovie: (movie: any) => void;
  currentUser: string;
}

const MovieRes: React.FC<MovieResProp> = (props) => {
  const method = "post";

  const addMovieToList = (movie: {}) => {
    props.onAddUserMovie(movie);
  };

  return (
    <ListCard className="movieCard">
      {props.movieResult.map((movie: any) => (
        <Movie
          key={movie.tmdbId}
          movie={movie}
          methodButton={addMovieToList}
          method={method}
          currentUser={props.currentUser}
        ></Movie>
      ))}
    </ListCard>
  );
};

export default MovieRes;
