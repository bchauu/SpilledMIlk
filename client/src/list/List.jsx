import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListCard } from "../wrapper/ListCard";
import Movie from "./Movie";
import Header from "../section/Header";
import Nav from "../section/Nav";

const List = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [bttnText, setBttnText] = useState("Share List");
  const location = useLocation();
  const navigate = useNavigate();


  const method = "get";

  //copy specific URL to user's clipboard
  const generateSharedList = () => {
    navigator.clipboard
      // .writeText(`http://localhost:3000/sharedList/${currentUser}`)
      .writeText(`https://spilled-milk.netlify.app/sharedList/${currentUser}`)
      .then(() => {
        setBttnText("Ready to Share :)");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
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
    setMovieList([...movieList.filter((movie) => movie._id != id)]); //changes state to only those that weren't deleted
  };

  useEffect(() => {
    if (location.state == null) {
      //incase link is not clicked from App.js
      redirectNow();
    } else {
      setCurrentUser(location.state.currentUser);
      // fetch(`http://localhost:8000/getMovies/${location.state.currentUser}`, {
      fetch(`https://backend-5ui3i37gv-bchauu.vercel.app/getMovies/${location.state.currentUser}`, {
        //fetches that specific user favorites list
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(data => {
          return data.json();
        })
        .then(data => {
          setMovieList([...data]);
        })
        .catch(err => console.log(err))
    }
  }, []);

  return (
    <div>
      <Header></Header>
      <Nav currentUser={currentUser} onLogOut={location.state.onLogOut}></Nav>
      <div className="list">
        <div>
          <h1>Favorites List</h1>
        </div>
      </div>
      <div className="share">
        <button className="shareButton" onClick={generateSharedList}>
          {bttnText}
        </button>
      </div>
      <div className="userGenerated">
        <ListCard>
          {movieList.map((movie) => (
            <div key={movie._id}>
              <Movie
                key={movie._id}
                movie={movie}
                methodButton={removeMovieHandler}
                method={method}
                currentUser={location.state.currentUser}
              ></Movie>
            </div>
          ))}
        </ListCard>
      </div>
    </div>
  );
};

export default List;
