const MovieList = require('../models/MovieModel');
const controller = {};

// controller.postMovie = (req, res, next) => {
//     const { data } = req.body;
//     console.log(req.body);
//     const addMovie = { name: data }
//     MovieList.create(addMovie)
//         .then((result) => {
//             // console.log(req)
//             console.log(result)
//             res.locals.result = result;
//             return next();
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// }

controller.postMovie = (req, res, next) => {
    const { data } = req.body;
    console.log(req.body);
    const addMovie = { movie: data }
    MovieList.create(addMovie)
        .then((result) => {
            // console.log(req)
            console.log(result)
            res.locals.result = result;
            return next();
        })
        .catch((err) => {
            console.log(err);
        })
}

controller.getMovies = (req, res, next) => {
    MovieList.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        console.log('hello')
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