const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const paymentIntentController = async (req, res) => {
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
    paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      currency: "usd",
      confirm: true,
      payment_method_types: ["card"],
    });

    res.send(paymentIntent);
  } catch (err) {
    console.log("error", err);
    res.status(err.statusCode || 500).send({
      success: false,
      message: `Error in payment processing: ${err.message}`,
    });
  }
};

module.exports = { paymentIntentController };
