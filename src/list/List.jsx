import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListCard } from '../wrapper/ListCard';
import Movie from './Movie';
import Header from '../wrapper/Header';
import Nav from '../wrapper/Nav';

const List = () => {
    const [movieList, setMovieList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [bttnText, setBttnText] = useState("Share List");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state == null) { //incase link is not clicked from App.js
            redirectNow();
        } else {
            setCurrentUser(location.state.currentUser); 
            fetch(`http://localhost:3434/getMovies/${location.state.currentUser}`, {    //fetches that specific user favorites list
                method: 'GET',
                headers: { 'Content-Type': 'application/json'}
            })
            .then(data => {
                return data.json();
            })
            .then(data => {
                setMovieList([...data]);
            })
        }
    }, []);

    //copy specific URL to user's clipboard
    const generateSharedList = () => {
        navigator.clipboard
          .writeText(`http://localhost:3000/sharedList/${currentUser}`)
          .then(() => {
            setBttnText("Ready to Share :)");
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

    const method = 'get';

    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
      }

    const removeMovie = (id) => {
        fetch('http://localhost:3434/deleteMessage', {
            method: 'DELETE',
            body: JSON.stringify({
              data: id
            }),
            headers: { 'Content-Type': 'application/json' }
          });
          setMovieList([...movieList.filter(movie => movie._id != id)]) //changes state to only those that weren't deleted
    };

    return (
        <div>
            <Header></Header>
            <Nav currentUser={currentUser}></Nav>
            <div className='list'>
                <h1>Favorites List</h1>
            </div>
            <div className='share'>
                <button className='shareButton' onClick={generateSharedList}>{bttnText}</button>
            </div>
            <div className='userGenerated'>
            <ListCard >
                {movieList.map(movie => (
                <div key={movie._id}>
                    <Movie key={movie._id} movie={movie} methodButton={removeMovie} method={method} currentUser={location.state.currentUser}></Movie>
                </div>
                ))}
            </ListCard>
            </div>
        </div>
    )
};

export default List;