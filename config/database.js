const mongoose = require("mongoose");

const connectDB = function () {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then((con) => {
      console.log`MongoDb Database with host: ${con.connection.host}`;
    })
    .catch((err) => {
      console.log`Database connection failed with error: ${err}`;
    });
};

module.exports = connectDB;
