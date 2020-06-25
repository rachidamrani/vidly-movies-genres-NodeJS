const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

// Connection to database

mongoose
  .connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB ..'))
  .catch((err) => console.erro('Could not connect to MongoDB ..'));

const port = process.env.PORT || 3000;
app.use(express.json()); // enable parsing json object
app.use('/api/genres', genres);

app.get('/', (req, res) => {
  res.end('<h1 style="text-align:center">Welcome to Movies genres API</h1>');
});

app.listen(port, () => {
  console.log('Server is listening on ' + port);
});
