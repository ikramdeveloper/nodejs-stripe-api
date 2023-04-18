const Joi = require("joi");

const paymentIntent = {
  body: Joi.object().keys({
    number: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    expMonth: Joi.number().required(),
    expYear: Joi.number().required(),
    cvc: Joi.number().required(),
    amount: Joi.number().required(),
  }),
};

const paymentCheckout = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
};

module.exports = { paymentIntent, paymentCheckout };
