const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  phone: Joi.string().min(10).required(),
});

module.exports = {
  addContactSchema,
};
