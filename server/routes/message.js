const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const authenticate = require("../auth");

// localhost:3030/mess/send   (CREATE Message)
router.post("/send", (req, res) => {
  const userId = req.body.userId;
  const senderId = req.body.senderId;

  models.User.findAll({
    where: {
      [Op.or]: [{ id: userId }, { id: senderId }],
    },
  }).then((users) => {
    let arr = [];

    users.forEach((user) => {
      isBand = user.isBand;
      arr.push(isBand);
    });

    if (arr[0] != arr[1]) {
      var type = "Membership";
    } else if (arr[0] === arr[1]) {
      var type = "Collab";
    }

    let message = models.Message.build({
      type: type,
      userId: userId,
      senderId: senderId,
    });

    message.save().then((savedMessage) => {
      res.json({
        success: true,
        message: "Message sent successfully",
        message,
      });
    });
  });
});

// localhost:3030/mess/mems/id   (See Users Membership Request)
router.get("/mems/:id", (req, res) => {
  const targetId = req.params.id;

  models.Message.findAll({
    where: {
      userId: targetId,
      type: "Membership",
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: models.User,
        as: "user",
      },
    ],
  })
    .then((message) => res.json(message))
    .catch((err) => res.json({ message: "No Memebership Request Found" }));
});

// localhost:3030/mess/colls/id   (See Users Collab Request)
router.get("/colls/:id", (req, res) => {
  const targetId = req.params.id;

  models.Message.findAll({
    where: {
      userId: targetId,
      type: "Collab",
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: models.User,
        as: "user",
      },
    ],
  })
    .then((message) => res.json(message))
    .catch((err) => res.json({ message: "No Collab Request Found" }));
});

// localhost:3030/mess/acc/id (Accepts requests)
router.post("/acc/:id", (req, res) => {
  const messId = req.params.id;

  models.Message.update(
    {
      accepted: true,
    },
    {
      where: {
        id: messId,
      },
      returning: true,
      plain: true,
    }
  ).then(function (updatedMess) {
    let obj = updatedMess[1].dataValues;

    if (obj.type === "Membership") {
      let member = models.Membership.build({
        userId: obj.userId,
        bandId: obj.senderId,
      });

      member.save().then((savedMember) => {
        res.json({ success: true, message: "Membership saved  successfully" });

        models.Message.destroy({
          where: { id: messId },
        }).then((message) => res.json({ message: "Message Deleted" }));
      });
    } else {
      let collab = models.Collab.build({
        userId: obj.senderId,
        receiverId: obj.userId,
      });
      collab.save().then((savedCollab) => {
        res.json({ success: true, message: "Collab saved successfully" });

        models.Message.destroy({
          where: { id: messId },
        }).then((message) => res.json({ message: "Message Deleted" }));
      });
    }
  });
});

// localhost:3030/mess/dec/id (Declines requests)
router.post("/dec/:id", (req, res) => {
  const messId = req.params.id;
  models.Message.destroy({
    where: {
      id: messId,
    },
  }).then((message) => res.json({ message: "Message Deleted" }));
});

module.exports = router;
