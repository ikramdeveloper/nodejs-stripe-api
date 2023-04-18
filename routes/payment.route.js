const route = require("express").Router();
const validate = require("../middleware/validate");
const paymentController = require("../controllers/payment.controller");
const paymentValidation = require("../validations/payment.validate");

route.post(
  "/",
  validate(paymentValidation.paymentIntent),
  paymentController.paymentIntentController
);

route.post(
  "/checkout",
  validate(paymentValidation.paymentCheckout),
  paymentController.paymentCheckoutController
);

module.exports = route;
