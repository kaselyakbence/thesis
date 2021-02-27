//Libraries
const express = require("express");
const { body, validationResult } = require("express-validator");

//Models
const User = require("../../models/User");

const validateRequest = require("../../middlewares/validate-request");

const router = express.Router();

router.post(
  "/signup",
  [
    body("nick_name")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
  ],
  validateRequest,
  async (req, res) => {
    const { nick_name, email, password } = req.body;

    user = new User({ nick_name, email, password });

    res.send(user);
  }
);

module.exports = router;
