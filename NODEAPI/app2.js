// Importing...
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("../routes/user.js");

const { config } = require("dotenv");

const app = express();

config({
  path: "../data/config.env",
});

// Using Middleware ... This is to access req.body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", userRouter);

module.exports = app;
