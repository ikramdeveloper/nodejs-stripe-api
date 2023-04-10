const route = require("express").Router();
const stripeController = require("../controllers/stripe.controller");

route.post("/", stripeController.paymentController);

module.exports = route;
