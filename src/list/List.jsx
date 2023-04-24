import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListCard } from '../wrapper/ListCard';
import Movie from './Movie';
import Header from '../wrapper/Header';
import Nav from '../wrapper/Nav';

const List = () => {
    const [movieList, setMovieList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const method = 'get';

    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
      }

    useEffect(() => {
        console.log('useeffect works')
        if (location.state == null) {
            redirectNow();
        } else {
            setCurrentUser(location.state.currentUser);
            fetch(`http://localhost:3434/getMovies/${location.state.currentUser}`, {
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

    const removeMovie = (id) => {
        console.log(id)
        fetch('http://localhost:3434/deleteMessage', {
            method: 'DELETE',
            body: JSON.stringify({
              data: id
            }),
            headers: { 'Content-Type': 'application/json' }
          });

          setMovieList([...movieList.filter(movie => movie._id != id)])
    };

    return (
    <div>
        <Header></Header>
        <Nav currentUser={currentUser}></Nav>
        <div className='list'>
            <h2>Favorites List</h2>
        </div>
        
        <ListCard>
            {movieList.map(movie => (
            <div>
                <Movie key={movie._id} movie={movie} methodButton={removeMovie} method={method} currentUser={location.state.currentUser}></Movie>
            </div>
            ))}
        </ListCard>

    </div>
    )
};

export default List;