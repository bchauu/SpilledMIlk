import Collapsible from 'react-collapsible';

const Episode = (props) => {
    const {seasons, changeSeason, seasonIndex} = props;

    return (
        <div className='episodeGuide'>
            <h1>Episodes Guide</h1>
            <div className='seasons'>
                {seasons.map((season, index) => (
                    <div key={index}>
                        <button className='seasonButton' onClick={changeSeason} value={index} > {season.title} </button>
                     </div>
                ))}
            </div>
            <h2>{seasons[seasonIndex].title}</h2>
            <div>
                {seasons[seasonIndex].episodes.map((episode, index) => (
                <Collapsible open={true} trigger={`S${parseInt(seasonIndex)+1}: E${index+1}`} key={index}>
                    <li className='episode'>
                        <div className='episodeBorder'>
                            <img src={episode.stillURLs.original} ></img>
                            <div className='info'>
                                <h2>{episode.title}</h2>
                                <p>{episode.overview}</p>
                            </div>

                        </div>
                    </li>
                </Collapsible>
                ))} 
            </div>
        </div>     
    )
}

export default Episode;