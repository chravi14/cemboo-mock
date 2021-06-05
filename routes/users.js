const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Load input validation
const validateRegisterInput = require("./../validation/register");
const validateLoginInput = require("./../validation/login");

// Load User model
const User = require("./../models/user");
const router = require("./order");

// Register Router

router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash Password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.status(201).json({
                user,
              })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login User

router.post("/login", (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  console.log(errors, "in login api");
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("in login api");

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email address is not registered" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Please provide a correct password" });
      } else {
        //   Create JWT payload
        const payload = {
          id: user._id,
          name: user.name,
        };

        // Sign Token
        jwt.sign(
          payload,
          config.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      }
    });
  });
});

module.exports = router;
