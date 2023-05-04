import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Nav = (props) => {
  const currentUser = props.currentUser;
  const currentPath = props.currentPath;

  return (
    <div>
      <div className="user">
        {currentUser ? (
          <Button variant="contained" className="userButton" onClick={props.onLogOut}>
            Log Out
          </Button>
        ) : (
          <div></div>
        )}
        {currentUser ? (
          <p>Welcome Back!</p>
        ) : (
          <Link className="userButton" to={"/login"} state={{ currentPath: currentPath}}>
            <Button variant="contained" className="userButton">
            Login
            </Button>
          </Link>
        )}
      </div>
      <div className="nav">
        <Link to={"/"}>
          <h2>Search</h2>
        </Link>
        <Link to={"/movieList"} state={{ currentUser, onLogOut: props.onLogOut }}>
          <h2>My List</h2>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
