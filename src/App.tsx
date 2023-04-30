import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./search/SearchBar";
import MovieRes from "./search/MovieRes";
import Header from "./wrapper/Header";
import Nav from "./wrapper/Nav";
import { movieResult } from "./movieResult.model";
import { UserContext } from "./contexts/user";

const App: React.FC = () => {
  const [movieResult, setMovieResult] = useState<movieResult[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");
  const [mostFavorite, setMostFavorite] = useState<any>([]);
  const [highestRatings, setHighestRatings] = useState<any>([]);
  const [searched, setSearched] = useState(false);

  const { fetchUser, logOutUser } = useContext(UserContext);

  const tempFavorite: any = [];
  const tempRating: any = []; //extract only movie info from fetched data

  useEffect(() => {
    loadUser();

    fetch("http://localhost:3434/mostAdded", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) =>
        res.forEach((res: any) => {
          tempFavorite.push(res.movie);
        })
      )
      .then(() => {
        setMostFavorite([...tempFavorite]);
      });

    fetch("http://localhost:3434/highestRatings", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) =>
        res.forEach((res: any) => {
          tempRating.push(res.movie);
        })
      )
      .then((res) => setHighestRatings([...tempRating]));
  }, []);

  const loadUser = async () => {
    const fetchedUser = await fetchUser();
    if (fetchedUser) {
      setCurrentUser(fetchedUser.id);
    }
  };

  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      if (loggedOut) {
        setCurrentUser("");
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  // to only render those that can be streamed
  const filterStreamable = (movieList: []) => {
    return movieList.filter((movie: any) => movie.streamingInfo.us);
  };

  //searching for matching name via API
  const addSearchResult = (enteredTitle: string) => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "941b4bb62fmsh2cd208cfce0be7fp1c6e37jsn4b6c6cf9335c",
        "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
      },
    };

    if (enteredTitle != undefined) {
      fetch(
        `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${enteredTitle}&country=us&output_language=en`,
        options
      )
        .then((response) => response.json())
        .then((response) =>
          setMovieResult([...filterStreamable(response.result)])
        )
        .then(() => setSearched(true))
        .catch((err) => console.error(err));
    }
  };

  //when add button is clicked
  const addUserMovie = (movie: movieResult) => {
    console.log(highestRatings);
    console.log(mostFavorite);

    if (currentUser != "") {
      //needs to be user

      fetch("http://localhost:3434/addMovie", {
        method: "POST",
        body: JSON.stringify({
          user: currentUser,
          data: movie,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    } else {
      console.log("please sign in");
    }
  };

  return (
    <div className="page">
      <Header></Header>
      <Nav currentUser={currentUser} onLogOut={logOut}></Nav>
      <div className="searchContent">
        <h1>Search Your Favorite Streams</h1>
        <SearchBar onSearchResult={addSearchResult}></SearchBar>
      </div>
      {searched ? ( //current user only called once and pass down
        <MovieRes
          movieResult={movieResult}
          onAddUserMovie={addUserMovie}
          currentUser={currentUser}
        ></MovieRes>
      ) : (
        <div className="userGenerated">
          <h1 className="favorites">Most Favorited</h1>
          <MovieRes
            movieResult={mostFavorite}
            onAddUserMovie={addUserMovie}
            currentUser={currentUser}
          ></MovieRes>
          <h1 className="favorites">Top Rated</h1>
          <MovieRes
            movieResult={highestRatings}
            onAddUserMovie={addUserMovie}
            currentUser={currentUser}
          ></MovieRes>
        </div>
      )}
    </div>
  );
};

export default App;
