const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const connectDB = require("./config/database");
const errorMiddleware = require("./middlewares/error");
const ErrorHandler = require("./utils/errorHandler");

// Setting up config.env file
dotenv.config({ path: __dirname + "/config/config.env" });

//handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.stack}`);
  console.log("Shutting down the server due to uncaught exception.");
  process.exit(1);
});

// Connecting to database
connectDB();

// setup body parser
app.use(express.json());

// setup cookiw parse
app.use(cookieParser());

//set fileUpload
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: ["positions"],
  })
);

// Setup CORS - Accessible by other domains
app.use(cors());

//hanlde rate limitng
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100, //10min
});
app.use(limiter);

//setup security headers
app.use(helmet());

// Importing routes.
const jobs = require("./routes/jobs");
const auth = require("./routes/auth");
const user = require("./routes/user");

app.use("/api/v1", jobs);
app.use("/api/v1", auth);
app.use("/api/v1", user);

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
