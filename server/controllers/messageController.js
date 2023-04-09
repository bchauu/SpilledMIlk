const MovieList = require('../models/MovieModel');
const controller = {};

controller.postMovie = (req, res, next) => {
    const { data } = req.body;
    const { user } = req.body;
    console.log(req.body);
    const addMovie = { 
        movie: data, 
        user: user
    }
    MovieList.create(addMovie)
        .then((result) => {
            console.log(result)
            res.locals.result = result;
            return next();
        })
        .catch((err) => {
            console.log(err);
        })
}

controller.getMovies = (req, res, next) => {
        const { tagId } = req.params;
        console.log(tagId)
    MovieList.find({user: tagId }, (err, result) => {
        if (err) {
            return next(err);
        }
        res.locals.allMovies = result;
        return next();
    })
}

controller.deleteMessage = (req, res, next) => {
    const { data } = req.body;
    console.log(data)
    MovieList.findByIdAndDelete(data, (err, result) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  };

module.exports = controller;