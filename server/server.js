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

app.get('/getMovies', controller.getMovies, (req, res) => {
    console.log('here')
    return res.status(200).json(res.locals.allMovies);
})

app.delete('/deleteMessage', controller.deleteMessage, (req, res) => {
    return res.status(200).json('Successfully deleted');
  });

app.get((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});