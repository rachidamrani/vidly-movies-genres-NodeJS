const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
});

const test = schema.validate({ name: 'rachiddskdlksjlksel' });

console.log(test.error.details[0].message);
