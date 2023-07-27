const express = require("express");
const User = require("../modals/user.js");
// Refering to express as app..
const app = express();

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  console.log(req.query);

  res.status(200).json({
    success: true,
    users,
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("tempi", "lol").json({
    success: true,
    message: "Registered successfully",
  });
};

const getUserid = async (req, res) => {
  // Here variable will be access by req.query or by req.params. Its name will be userId Here...
  const { userId } = req.params;
  const user = await User.findById(userId);

  res.json({
    success: true,
    user,
  });

  app.get("/", (req, res) => {
    res.send("Working noice");
  });
};

module.exports = {
  getAllUsers,
  register,
  getUserid,
};
