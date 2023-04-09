
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const myURI = 'mongodb+srv://bryancee12:IZpNbQvm0k2ntWLV@cluster0.8pfsy4u.mongodb.net/Users?retryWrites=true&w=majority'


mongoose
    .connect(
        myURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connection to Mongo DB successful.'))
    .catch((err) => console.log(err));

const MovieSchema = new mongoose.Schema(
    {
    movie: { type: Object, required: false },
    user: { type: String, required: false}
    }, 
    { collection: 'bchauu' }
);

module.exports = mongoose.model('Movies', MovieSchema);