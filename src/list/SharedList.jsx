import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Movie from "./Movie";
import Header from "../wrapper/Header";
import { ListCard } from "../wrapper/ListCard";
import { UserContext } from "../contexts/user";

const SharedList = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [movieList, setMovieList] = useState([]);
  const routeParams = useParams();

  const { fetchUser } = useContext(UserContext);
  const method = "get";

  const loadUser = async () => {
    const fetchedUser = await fetchUser();
    if (fetchedUser) {
      setCurrentUser(fetchedUser.id);
    }
  };

  useEffect(() => {
    loadUser();

    //fetches a friend's streaming list
    fetch(`http://localhost:3434/getMovies/${routeParams.userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMovieList([...data]);
      });
  }, []);

  const removeMovie = (id) => {
    console.log(id);
    fetch("http://localhost:3434/deleteMessage", {
      method: "DELETE",
      body: JSON.stringify({
        data: id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setMovieList([...movieList.filter((movie) => movie._id != id)]);
  };

  const addUserMovie = (movie) => {
    if (currentUser != "") {
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
    <div>
      <Header></Header>
      <div className="list">
        <h2>Friend's Favorites List</h2>
      </div>

      <ListCard>
        {currentUser == routeParams.userId //conditionally render depending if user is same as the list's owner or not
          ? movieList.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                methodButton={removeMovie}
                method={method}
                currentUser={currentUser}
              ></Movie>
            ))
          : movieList.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                methodButton={addUserMovie}
                method={method}
                currentUser={currentUser}
              ></Movie>
            ))}
      </ListCard>
    </div>
  );
};

export default SharedList;
