const express = require("express");
const registerUser = require("./UserController").default

const router = express.Router()

// Already defined /api/v1 in express.js, in app.use()
router.route("/register").post(registerUser)

module.exports = router;