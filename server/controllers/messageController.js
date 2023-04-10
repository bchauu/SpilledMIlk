
const MovieList = require('../models/MovieModel');
const MovieCount = require('../models/MovieCountModel');
const controller = {};

controller.postMovieCount = (req, res, next) => {
    const { data } = req.body;

    MovieCount.updateOne({_id: data.tmdbId}, { $setOnInsert: {movie: data}, $inc: {count: 1}}, { upsert: true })
        .then ((result) => {
            res.locals.result = result;
            return next();
        })
        .catch((err) => {
            console.log(err);
        })
}

controller.postMovie = (req, res, next) => {
    const { data } = req.body;
    const { user } = req.body;
    const addMovie = { 
        movie: data, 
        user: user
    }
    MovieList.create(addMovie)
        .then((result) => {
            res.locals.result = result;
            return next();
        })
        .catch((err) => {
            console.log(err);
        })
}

controller.getMovies = (req, res, next) => {
        const { tagId } = req.params;
    MovieList.find({user: tagId }, (err, result) => {
        if (err) {
            return next(err);
        }
        res.locals.allMovies = result;
        return next();
    })
}

controller.mostAdded = (req, res, next) => {
    MovieCount.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        res.locals.mostAdded = result;
       return next()
    }).sort({count:-1}).limit(15);
}

controller.deleteMessage = (req, res, next) => {
    const { data } = req.body;
    MovieList.findByIdAndDelete(data, (err, result) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  };

module.exports = controller;