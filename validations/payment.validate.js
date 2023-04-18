const Joi = require("joi");

const paymentIntent = {
  body: Joi.object().keys({
    number: Joi.number().required(),
    expMonth: Joi.number().required(),
    expYear: Joi.number().required(),
    cvc: Joi.number().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = { paymentIntent };
