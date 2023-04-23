import React, { useState, useContext, useEffect } from 'react';
import SearchBar from "./search/SearchBar";
import MovieRes from './search/MovieRes';
import Header from './wrapper/Header';
import Nav from './wrapper/Nav';
import { movieResult } from './movieResult.model';
import { UserContext } from './contexts/user'; 

const App: React.FC = () => {
    const [movieResult, setMovieResult] = useState<movieResult[]>([]);
    const [currentUser, setCurrentUser] = useState<string>('');
    const [mostFavorite, setMostFavorite] = useState<any>([]);
    const [searched, setSearched] = useState(false);

    const { fetchUser, logOutUser } = useContext(UserContext);

    const tempFavorite: any = [];

    useEffect(() => {
        loadUser();
        console.log('user is loaded');

        fetch('http://localhost:3434/mostAdded', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, 
        })
            .then(res => res.json())
            .then(res => res.forEach((res:any) => {
                tempFavorite.push(res.movie)
            }) )
            .then(() => {
                setMostFavorite([...tempFavorite])
            })

      }, [movieResult]);


    const loadUser = async () => {
          const fetchedUser = await fetchUser();
          if (fetchedUser) {
            setCurrentUser(fetchedUser.id);
          } 
      }

    const logOut = async () => {
        console.log('working')
        try {
          const loggedOut = await logOutUser();
          if (loggedOut) {
            setCurrentUser('');
            window.location.reload();
          }
        } catch (error) {
          alert(error)
        }
      }

    const filterStreamable = (movieList: []) => {
        return movieList.filter( (movie: any) => movie.streamingInfo.us)
    }

    const addSearchResult = (enteredTitle: string) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '941b4bb62fmsh2cd208cfce0be7fp1c6e37jsn4b6c6cf9335c',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
            }
        };

        if (enteredTitle != undefined) {
            fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${enteredTitle}&country=us&output_language=en`, options)
            .then(response => response.json())
            .then(response => setMovieResult([...filterStreamable(response.result)]))
            .then(() => setSearched(true))
            .catch(err => console.error(err));
        }
    }

    const addUserMovie = (movie: movieResult) => {

        if (currentUser != '') {

            fetch('http://localhost:3434/addMovie', {
                method: 'POST',
                body: JSON.stringify({
                    user: currentUser,
                    data: movie
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(res => res.json())
                .then(res => console.log(res))

        } else {
            console.log('please sign in')
        }

    }

    return(
        <div className='page'>
            <Header onLogOut={logOut}></Header>
            <Nav currentUser={currentUser} onLogOut={logOut} ></Nav>
            <div className='searchContent'>
                    <h1>
                        Search Your Favorite Show
                    </h1>
                    <SearchBar onSearchResult={addSearchResult}></SearchBar>
                  </div>
            {searched   
                ? <MovieRes movieResult={movieResult} onAddUserMovie={addUserMovie} currentUser={currentUser} ></MovieRes>
                : <div >
                <h1 className='favorites'>
                    Most Added to Favorites
                </h1>
            <MovieRes movieResult={mostFavorite} onAddUserMovie={addUserMovie} currentUser={currentUser} ></MovieRes>
            </div>
            }
        </div>
    )
}

export default App;