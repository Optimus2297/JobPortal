const express = require("express");
const app = express();

const dotenv = require("dotenv");

const connectDB = require("./config/database");
const errorMiddleware = require("./middlewares/error");
const ErrorHandler = require("./utils/errorHandler");

// Setting up config.env file
dotenv.config({ path: __dirname + "/config/config.env" });

//handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to uncaught exception.");
  process.exit(1);
});

// Connecting to database
connectDB();

// setup body parser
app.use(express.json());

// Importing routes.
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");

app.use("/api/v1", jobs);
app.use("/api/v1", auth);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Setup error middleware
app.use(errorMiddleware);

let port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shuding down the server due to unhanled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
