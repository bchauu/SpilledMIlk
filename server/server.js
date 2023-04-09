const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controllers/messageController');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3434;

app.use(cors())

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addMovie', controller.postMovie, (req, res) => {
    console.log(req.body)
    return res.status(200).json(res.locals.result);
})

app.get('/getMovies/:tagId', controller.getMovies, (req, res) => {
    return res.status(200).json(res.locals.allMovies);
})

app.delete('/deleteMessage', controller.deleteMessage, (req, res) => {
    return res.status(200).json('Successfully deleted');
  });

app.get((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});


//get request for what others are adding
    // when others add to favorites list, it will increase same amount of objects with same imdb_id
        // every post request will also send middleware to create new collection
        // top 15
        // get request from all, store in cache with count for each {imdb: count}
        // send the cache as response back to frontend
            //filter out top 15 highest (not sure front or backend)
    
//get recently used cache (LRU cache)
    // top 20 just added
    // when added to favorite,
        // added to new collection that only holds 10
            // drops the one last used
    // returns in order of most recent