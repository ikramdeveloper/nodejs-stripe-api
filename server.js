require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripeRoute = require("./routes/stripe.route");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/payment", stripeRoute);

app.get("/", (req, res) => {
  res.json({ success: true, message: "NodeJS Api running successfully" });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
