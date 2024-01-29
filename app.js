const express = require("express");
const app = express();

const dotenv = require("dotenv");

const connectDB = require("./config/database");

// Setting up config.env file
dotenv.config({ path: __dirname + "/config/config.env" });

// Connecting to database
connectDB();

// Importing routes.
const jobs = require("./routes/jobs");

app.use("/api/v1", jobs);

let port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
