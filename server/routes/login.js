const express = require("express");
const router = express.Router();
const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// localhost:3030/login
router.post("/", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  models.User.findOne({
    where: { username: name },
  })
    .then((user) => {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          var token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
          res.json({
            success: true,
            token: token,
            id: user.id,
            isBand: user.isBand,
            name: user.username
          });
        } else {
          res.json({ message: "Invalid password" });
        }
      });
    })
    .catch((error) => {
      res.json({ message: "User doesn't Exist!" });
    });
});

// localhost:3030/login/register
router.post("/register", (req, res) => {
  const name = req.body.name;
  const talent = req.body.talent;
  const isBand = req.body.isBand ? null : false;
  const password = req.body.password;
  const area = req.body.state;
  

  bcrypt.genSalt(10, function (error, salt) {
    bcrypt.hash(password, salt, function (error, hash) {
      if (!error) {
        let user = models.User.build({
          username: name,
          password: hash,
          talent: talent,
          isBand: isBand,
          area: area,
      
        });

        user.save().then((savedUser) => {
          res.json({ success: true });
        });
      } else {
        res.json({ success: false });
      }
    });
  });
});


// localhost:3030/login/demo
router.post("/", (req, res) => {
  const name = 'demo'
  const password = 'req.body.password';

  models.User.findOne({
    where: { username: name },
  })
    .then((user) => {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          var token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
          res.json({
            success: true,
            token: token,
            id: user.id,
            isBand: user.isBand,
          });
        } else {
          res.json({ message: "Invalid password" });
        }
      });
    })
    
});


module.exports = router;
