import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../wrapper/Header';
import Nav from '../wrapper/Nav';
import { DetailsCard } from '../wrapper/DetailsCard';
import Episode from './Episode';
import PlatformLogo from './PlatformLogo';

const Details: React.FC = () => {
    const [seasonIndex, setSeasonIndex] = useState('0');
    const location = useLocation();
    const movieDetails = location.state.data;
    const currentUser = location.state.user;

    let allGenres = '';

    movieDetails.genres.map((genre: {name: string}) => {
        allGenres += `${genre.name}`+ ' ';
    })
    const streamPlatform = Object.keys(movieDetails.streamingInfo.us)

    const changeSeason = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSeasonIndex(event.currentTarget.value)
    }

    const addUserMovie = (movie: any) => {
            console.log('movie')
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

    return (
        <div>
            <Header></Header>
            <Nav currentUser={currentUser}></Nav>
            <DetailsCard>
                <div className='top'>
                    <div className='visual'>
                        <img src={movieDetails.posterURLs.original}></img>
                        <button className='favoritesButton' onClick={() => addUserMovie(movieDetails)}>Add to Favorites</button>
                    </div>
                     <div>
                        <div className='header'>
                            {movieDetails.type == 'movie'
                                ? <h1>{`${movieDetails.title} (${movieDetails.year})`}</h1>
                                : <h1>{`${movieDetails.title} (${movieDetails.firstAirYear})`}</h1>
                            }
                        </div>
                        <div className='score'>
                                <img className='imdb' src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg'/> 
                                <h2>{`${movieDetails.imdbRating}/100`}</h2>
                        </div>
                        <div className='metaData'>
                            <h2 className='genre'>{allGenres}</h2>
                            {movieDetails.type == 'movie'
                                ? <h2 className='type' >Movie</h2>
                                : <h2 className='type' >{`${movieDetails.seasons.length} Seasons`}</h2>
                            }
                        </div>
                        <div className={'info'}>
                            <p>{movieDetails.overview}</p>
                        </div>
                        <div>
                            <h2>Where to Watch:</h2>
                            <div className='platforms'>
                            {streamPlatform.map((platform, index) => (
                                <PlatformLogo platform={platform} key={index}></PlatformLogo> 
                            ))}
                            </div>
                        </div>
                     </div>
                </div>
                {movieDetails.type == 'series'
                    ? <Episode changeSeason={changeSeason} seasons={movieDetails.seasons} seasonIndex={seasonIndex}></Episode>
                    : <div></div>
                }
            </DetailsCard>
        </div>
    )
}





export default Details;