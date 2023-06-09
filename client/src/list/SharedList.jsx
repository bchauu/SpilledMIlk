import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import Movie from "./Movie";
import Header from "../section/Header";
import { ListCard } from "../wrapper/ListCard";
import { UserContext } from "../contexts/user";
import Nav from "../section/Nav";

const SharedList = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [movieList, setMovieList] = useState([]);
  const routeParams = useParams();

  const location = useLocation();

  const { fetchUser } = useContext(UserContext);
  const method = "get";

  const loadUser = async () => {
    const fetchedUser = await fetchUser();
    if (fetchedUser) {
      setCurrentUser(fetchedUser.id);
      console.log(fetchUser.id)
    }
  };

  const removeMovieHandler = (id) => {

    // fetch("http://localhost:8000/deleteMessage", {
    fetch("https://backend-5ui3i37gv-bchauu.vercel.app/deleteMessage", {
      method: "DELETE",
      body: JSON.stringify({
        data: id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    setMovieList([...movieList.filter((movie) => movie._id != id)]);
  };

  const addUserMovieHandler = (movie) => {
    if (currentUser != "") {

      // fetch("http://localhost:8000/addMovie", {
      fetch("https://backend-5ui3i37gv-bchauu.vercel.app/addMovie", {
        method: "POST",
        body: JSON.stringify({
          user: currentUser,
          data: movie,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch(err => err)
    } else {
      console.log("User has not signed sign in");
    }
  };

  useEffect(() => {
    loadUser();
    console.log(location.pathname)

    //fetches a friend's streaming list

    // fetch(`http://localhost:8000/getMovies/${routeParams.userId}`, {
    fetch(`https://backend-5ui3i37gv-bchauu.vercel.app/getMovies/${routeParams.userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMovieList([...data]);
      })
      .catch((err) =>  err)
  }, []);

  return (
    <div>
      <Header></Header>
      <Nav currentPath={location.pathname} currentUser={currentUser}></Nav>
      <div className="list">
        <div>
          <h1>Friend's Favorites List</h1>
        </div>
      </div>
    
    <div className="userGenerated">
      <ListCard>
        {currentUser == routeParams.userId //conditionally render depending if user is same as the list's owner or not
          ? movieList.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                methodButton={removeMovieHandler}
                method={method}
                currentUser={currentUser}
              ></Movie>
            ))
          : movieList.map((movie) => (
              <Movie
                key={movie._id}
                movie={movie}
                methodButton={addUserMovieHandler}
                method={method}
                currentUser={currentUser}
              ></Movie>
            ))}
      </ListCard>
      </div>
    </div>
  );
};

export default SharedList;
