import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListCard } from '../wrapper/ListCard';
// import { UserContext } from '../contexts/user';
import Movie from './Movie';
import Header from '../wrapper/Header';
import Nav from '../wrapper/Nav';

const List = () => {
    const [movieList, setMovieList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    // const [userLoaded, setUserLoaded] = useState(false);
    const [bttnText, setBttnText] = useState("Share with Friends");
    const location = useLocation();
    const navigate = useNavigate();

    // const { fetchUser, logOutUser } = useContext(UserContext);

    // const loadUser = async () => {
    //     const fetchedUser = await fetchUser();
    //     if (fetchedUser) {
    //       setCurrentUser(fetchedUser.id);
    //       setUserLoaded(true);
    //     } 
    // }

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

    useEffect(() => {

        console.log('useeffect works')
        console.log(location.state)
        if (location.state == null) {
            console.log('redirected')
            redirectNow();
        } else {
            console.log(currentUser, 'check if user is loaded')
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
        <div className='share'>
            <button className='shareButton' onClick={generateSharedList}>{bttnText}</button>
        </div>
        <ListCard>
            {movieList.map(movie => (
            <div key={movie._id}>
                <Movie key={movie._id} movie={movie} methodButton={removeMovie} method={method} currentUser={location.state.currentUser}></Movie>
            </div>
            ))}
        </ListCard>
    </div>
    )
};

export default List;