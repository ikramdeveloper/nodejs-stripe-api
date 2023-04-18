require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const paymentRoute = require("./routes/payment.route");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// HTTP request logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Routes
app.use("/api/payment", paymentRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "NodeJS Api running successfully" });
});

// unhandled route
app.all("*", (req, res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

//* Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
