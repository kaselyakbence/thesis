//Libraries
const express = require("express");

//Import routes
const signup = require("./signup");

const router = express.Router();

router.use(signup);

module.exports = router;
