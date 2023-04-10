const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const paymentController = async (req, res) => {
  const { name, price, quantity } = req.body ?? {};
  if (!name || !price || !quantity) {
    return res.json({
      success: false,
      message: "name, price and quantity are required",
    });
  }
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
    // console.log("session", session);

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error in payment",
    });
  }
};

module.exports = { paymentController };
