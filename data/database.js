const mongoose = require("mongoose");

// Connecting to mongo DB
const connectDB = () => {
  mongoose
    .connect(process.env.Mongo_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

module.exports = connectDB;
