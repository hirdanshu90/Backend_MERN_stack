const { getAllUsers, register, getUserid } = require("../controllers/user.js");
const User = require("../modals/user.js");

const express = require("express");

const router = express.Router();

// READ product... GET request
router.get("/all", getAllUsers);

// Creating a user... POST request
router.post("/new", register);

// Dynamic URL...  /:id, id can be anything
// Keep the dynamic route at last.

router.get("/userid/:userId", getUserid);

module.exports = router;
