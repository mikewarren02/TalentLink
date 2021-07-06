const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const authenticate = require("../auth");




// localhost:3030/user/:userId  (UPDATE User)
router.post("/:userId",  (req, res) => {
    const talent = req.body.talent;
    const isBand = req.body.isBand;
    const profile_pic = req.params.profile_pic;
    const area = req.body.area;
    const description = req.body.description;
    const userId = req.params.userId
  
    models.User.update(
      {
          talent: talent,
          isBand: isBand,
          profile_pic: profile_pic,
          area: area,
          description: description,
      },
      {
        where: {
          id: userId,
        },
        returning: true,
        plain: true,
      }
    ).then((updatedUser) => {
        let obj = updatedUser[1].dataValues;
      res.json({ success: true, message: "User updated successfully", obj});
    });
  });

// localhost:3030/user/:userId  (GET User Info)
router.get('/peak/:userId', (req, res) => {
  const user = req.params.userId

  models.User.findOne({
    where: {
      id: user
    },
    include: [
      {
        model: models.Post,
        as: "post",
      },
    ],
  })


})











module.exports = router;
