import React, { useState } from 'react';
import SearchBar from "./search/SearchBar";
import MovieRes from './search/MovieRes';
import { movieResult } from './movieResult.model';


const App: React.FC = () => {

    const [movieResult, setMovieResult] = useState<movieResult[]>([]);

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

    //wrapper cards for each movie 
    //filter out those without stream

    return(
        <div>
            Newer Component
            <SearchBar onSearchResult={addSearchResult}></SearchBar>
            <MovieRes movieResult={movieResult}></MovieRes>   
        </div>
    )
}

export default App;