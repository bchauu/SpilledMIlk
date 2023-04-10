const express = require('express');
const app = express();
const controller = require('./controllers/messageController');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3434;

app.use(cors())

app.use(express.json({limit: '5mb'}));  //address payload too large
app.use(express.urlencoded({limit: '5mb', extended: true}));



app.post('/addMovie', controller.postMovieCount, (req, res, next) => {
    console.log('over here', '2')
    next();
});

app.post('/addMovie', controller.postMovie, (req, res) => {
    console.log('here', '4')
    return res.status(200).json(res.locals.result);
    
});

app.get('/getMovies/:tagId', controller.getMovies, (req, res) => {
    return res.status(200).json(res.locals.allMovies);
});

app.get('/mostAdded', controller.mostAdded, (req, res) => {
    return res.status(200).json(res.locals.mostAdded);
})

app.delete('/deleteMessage', controller.deleteMessage, (req, res) => {
    return res.status(200).json('Successfully deleted');
  });

app.get((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
