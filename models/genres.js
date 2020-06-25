const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// Schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

// Model
const Genre = mongoose.model('Genre', genreSchema);

function schemaValidator(data) {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(data);
}

exports.Genre = Genre;
exports.validate = schemaValidator;
