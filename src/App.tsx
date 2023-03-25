import React, { useState } from 'react';
import SearchBar from "./search/SearchBar";
import MovieRes from './search/MovieRes';


const App: React.FC = () => {

    const [movieResult, setMovieResult] = useState([]);
    

    const addSearchResult = (enteredTitle: string, enteredDate: string) => {
        console.log(enteredDate, enteredTitle);

        //fetch from API with user input
            //store in state
            //pass the state to MovieResult -> array of objects
                //MovieResult will map each movie in array to render a list via <MovieItem>


        // setMovieResult((prevState) => {
        //     return [...prevState, movieResult];
        // })
    }

    return(
        <div>
            Newer Component
            <SearchBar onSearchResult={addSearchResult}></SearchBar>
            <MovieRes></MovieRes>   
        </div>
    )
}

export default App;