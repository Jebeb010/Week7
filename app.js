const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.put('/actors/:aid/:mid', actors.pullmovie);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actorM/:id', actors.deleteactorM)

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.get('/movies/spec', movies.getSome);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.put('/movies/:mid/:aid', movies.pullactor);
app.put('/movies/push/:mid/:aid', movies.pushactor);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies', movies.deleteMany);