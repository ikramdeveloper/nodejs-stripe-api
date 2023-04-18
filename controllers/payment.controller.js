const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
const AppError = require("../utils/appError");

const paymentIntentController = async (req, res, next) => {
  const { number, expMonth, expYear, cvc, amount } = req.body;
  try {
    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      },
    });
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: "usd",
      confirm: true,
      payment_method_types: ["card"],
    });

    res.status(200).send({
      status: paymentIntent.status,
    });
  } catch (err) {
    next(new AppError(err.statusCode, err.message));
  }
};

const paymentCheckoutController = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name,
            },
            unit_amount: price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: quantity,
        },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    res.status(200).send({ status: "succeeded", id: session.id });
  } catch (err) {
    next(new AppError(err.statusCode, err.message));
  }
};

module.exports = { paymentIntentController, paymentCheckoutController };
