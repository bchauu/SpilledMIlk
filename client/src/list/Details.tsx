import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../section/Header";
import Nav from "../section/Nav";
import { DetailsCard } from "../wrapper/DetailsCard";
import Episode from "./Episode";
import { Rating } from "@mui/material";
import PlatformLogo from "./PlatformLogo";

const Details: React.FC = () => {
  const [seasonIndex, setSeasonIndex] = useState("0");
  const [hasEpisodes, setHasEpisodes] = useState(true);
  const location = useLocation();
  const { data: movieDetails, user: currentUser } = location.state; //passed in info react router

  let allGenres = "";

  movieDetails.genres.map((genre: { name: string }) => {
    //transform genres into a string;
    allGenres += `${genre.name}` + " ";
  });
  const streamPlatform = Object.keys(movieDetails.streamingInfo.us);

  const changeSeason = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSeasonIndex(event.currentTarget.value);

    //due to inconsistency in data from API
    if (
      movieDetails.seasons[event.currentTarget.value] &&
      movieDetails.seasons[event.currentTarget.value].episodes
    ) {
      setHasEpisodes(true);
    } else {
      setHasEpisodes(false);
    }
  };

  const addUserMovieHandler = (movie: any) => {
    if (currentUser != "") {
      //incase user is not signed in

      // fetch("http://localhost:8000/addMovie", {
      fetch("https://backend-5ui3i37gv-bchauu.vercel.app/addMovie", {
        method: "POST",
        body: JSON.stringify({
          user: currentUser,
          data: movie,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        // .then(res => console.log(res))
        .catch(err => console.log(err))
    } else {
      console.log("please sign in");
    }
  };

  const RateMovieHandler = (value: number) => {
    if (value != null) {

      // if same value is clicked twice, it becomes null
      // fetch("http://localhost:8000/addRating", {
      fetch("https://backend-5ui3i37gv-bchauu.vercel.app/addRating", {
        method: "POST",
        body: JSON.stringify({
          rating: value,
          movie: movieDetails,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }
  };

  return (
    <div>
      <Header></Header>
      <Nav currentUser={currentUser}></Nav>
      <DetailsCard>
        <div className="top">
          <div className="visual">
            <button
              className="favoritesButton"
              onClick={() => addUserMovieHandler(movieDetails)}
            >
              Add to Favorites
            </button>
            <img src={movieDetails.posterURLs.original}></img>
          </div>
          <div>
            <div className="title">
              {movieDetails.type == "movie" ? (
                <h1>{`${movieDetails.title} (${movieDetails.year})`}</h1>
              ) : (
                <h1>{`${movieDetails.title} (${movieDetails.firstAirYear})`}</h1>
              )}
            </div>
            <div className="score">
              <div className="scoreImdb">
                <img
                  className="imdb"
                  src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                />
                <h2>{`${movieDetails.imdbRating/10}/10`}</h2>
              </div>
              <div>
                <h2>Rate this Stream:</h2>
                <Rating
                  name="simple-controlled"
                  defaultValue={2.5}
                  onChange={(event, newValue) => {
                    RateMovieHandler(newValue);
                  }}
                  precision={0.5}
                />
              </div>
            </div>
            <div className="metaData">
              <h2 className="genre">{allGenres}</h2>
              {movieDetails.type == "movie" ? (
                <h2 className="type">Movie</h2>
              ) : (
                <h2 className="type">{`${movieDetails.seasons.length} Seasons`}</h2>
              )}
            </div>
            <div className={"info"}>
              <p>{movieDetails.overview}</p>
            </div>
            <div>
              <h2>Where to Watch:</h2>
              <div className="platforms">
                {streamPlatform.map((platform, index) => (
                  <PlatformLogo platform={platform} key={index}></PlatformLogo>
                ))}
              </div>
            </div>
          </div>
        </div>
        {movieDetails.type == "series" ? (
          <Episode
            changeSeason={changeSeason}
            seasons={movieDetails.seasons}
            seasonIndex={seasonIndex}
            hasEpisodes={hasEpisodes}
          ></Episode>
        ) : (
          <div></div>
        )}
      </DetailsCard>
    </div>
  );
};

export default Details;
