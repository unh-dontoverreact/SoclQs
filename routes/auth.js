const express = require("express");
const router = express.Router();
const { User: db } = require("../models");
const passport = require("../passport");

// POST("/auth/") -- register a new user in the database if it is not a duplicate
router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, email, firstName, lastName, image } = req.body;

  // ADD VALIDATION -- error if user already exists
  db.User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.status(412).json({
        error: "Sorry, already a user with the username: ${username}",
      });
    } else {
      /* Unique user - add to the database */
      const newUser = new db.User({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        image: image,
      });
      newUser.save((err, savedUser) => {
        if (err) {
          return res.status(412).json(err);
        }
        res.json(savedUser);
      });
    }
  });
});

// POST("/auth/login") - authenticate the user (add to local session) and return the user object
router.post(
  "/login",
  function(req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in ", req.user.email);
    res.send(req.user);
  }
);

// GET("/auth/") -- return the current logged in username and database key (_id)
router.get("/", (req, res /*, next */) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// POST("/auth/logout") -- unauthenticates the user from the request and clears the session
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
