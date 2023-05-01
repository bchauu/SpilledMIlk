import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const currentUser = props.currentUser;

  return (
    <div>
      <div className="user">
        {currentUser ? (
          <button className="userButton" onClick={props.onLogOut}>
            Log Out
          </button>
        ) : (
          <div></div>
        )}
        {currentUser ? (
          <p>Welcome Back!</p>
        ) : (
          <Link className="userButton" to={"/login"}>
            Login{" "}
          </Link>
        )}
      </div>
      <div className="nav">
        <Link to={"/"}>
          <h2>Search</h2>
        </Link>
        <Link to={"/movieList"} state={{ currentUser }}>
          <h2>My List</h2>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
