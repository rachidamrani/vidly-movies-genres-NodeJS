const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const port = process.env.PORT || 3000;

app.use(express.json()); // enable parsing json object

genres = [
  { id: 1, name: 'Drama' },
  { id: 2, name: 'Horor' },
  { id: 3, name: 'Action' },
];

app.get('/', (req, res) => {
  res.end('<h1 style="text-align:center">Welcome to Movies genres API</h1>');
});

// Get List of genres
app.get('/api/genres', (req, res) => {
  res.end(JSON.stringify(genres));
});

// Get a single genre
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) {
    return res
      .status(404)
      .send('The genre your ara looking for not found! sorry!');
  }
  res.send(genre);
});

// Post genres
app.post('/api/genres', (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  const result = schemaValidator(genre);
  if (!result.error) {
    genres.push(genre);
    res.send(genre);
  } else {
    res.status(404).send(result.error.details[0].message);
  }
});

// Update genre
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre) {
    return res
      .status(404)
      .send('The genre your are looking for not found! sorry!!');
  }

  const genreResult = {
    id: parseInt(req.params.id),
    name: req.body.name,
  };

  const result = schemaValidator(genreResult);
  if (!result.error) {
    genre.name = req.body.name;
  } else {
    res.status(400).send(result.error.details[0].message);
  }

  res.send(genre);
});

// Delete genre
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre with given ID was not found!');
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

app.listen(port, () => {
  console.log('Server is listening on ' + port);
});

function schemaValidator(data) {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data);
}
