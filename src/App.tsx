import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "./search/SearchBar";
import MovieRes from './search/MovieRes';
import { movieResult } from './movieResult.model';

const App: React.FC = () => {
    const [movieResult, setMovieResult] = useState<movieResult[]>([]);
    const [userMovie, setUserMovie] = useState<movieResult[]>([]);

    const filterStreamable = (movieList: []) => {
        return movieList.filter( (movie: any) => movie.streamingInfo.us)
    }

    const addSearchResult = (enteredTitle: string, enteredDate: string) => {

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
            .catch(err => console.error(err));
        }

        console.log(movieResult);
    }

    const addUserMovie = (movie: movieResult) => {
        setUserMovie(
            [...userMovie, movie]
        )

        console.log(userMovie);
        console.log('added to state')

        fetch('http://localhost:3434/addMovie', {
            method: 'POST',
            body: JSON.stringify({
                data: movie
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(res => console.log(res))
    }

        //use effect for top trending
        //add users 
            //specific list for user
        //share movieList

    return(
        <div className='page'>
            <div className='header'>
                <h1>Spilled Milk</h1>
            </div>
            <div className='searchContent'>
                <h2>
                    Search Your Favorite Show
                </h2>
                <SearchBar onSearchResult={addSearchResult}></SearchBar>
            </div>
            <MovieRes movieResult={movieResult} onAddUserMovie={addUserMovie}  ></MovieRes>
            <div>
                MyList 
                <Link to={'/movieList'}>Click Here</Link>
            </div>   
        </div>
    )
}

export default App;