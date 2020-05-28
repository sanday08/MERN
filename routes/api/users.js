const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validRegistrationInput = require("../../validation/register");
const validLoginInput = require("../../validation/login");

const router = express.Router();

//@route   Get api/users/register
//@desc    Register users routes
//@access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validRegistrationInput(req.body);
  //Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists..";
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200", //Size
      r: "pg", //Rating
      d: "mm", //Default
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => Console.log(err));
      });
    });
  });
});

//@route   Get api/users/login
//@desc    Login users and return JWT token
//@access  Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validLoginInput(req.body);
  //Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User
  User.findOne({ email }).then((user) => {
    //check  User
    if (!user) {
      errors.email = "User Not found";
      return res.status(404).json(errors);
    }
    //check Password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //Success Pasing Jwt Token
        //payload
        const payload = { name: user.name, id: user._id, avatar: user.avatar };
        //Jwt token sign
        jwt.sign(
          payload,
          secret.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            return res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password is incorrect.";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route   Get api/users/current
//@desc    Return Current Users.
//@access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
