const express = require("express");
const { body } = require("express-validator");

const {createUser, login, refresh} = require("../controllers/userController")


const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage(" A user must have a name"),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("A user must have a valid email"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(
        "A user must have a password with minumum length of 8 characters",
      ),
    body("confirmPassword")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("A user must confirm password"),
  ],
  createUser
);

router.post("/login",[

    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("A valid email is needed to login"),
    body("password").notEmpty().withMessage("password is needed to login"),
  ], login
);

router.get("/refresh", refresh)

module.exports = router;
