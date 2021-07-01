const express = require("express");
const router = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const authenticate = require("../auth");

// localhost:3030/post   (CREATE POST)
router.post("/", (req, res) => {
  const content = req.body.content;
  const caption = req.body.caption;
  const isBand = req.body.isBand;
  const userId = parseInt(req.body.userId);

  let post = models.Post.build({
    caption: caption,
    content: content,
    userId: userId,
    isBand: isBand,
  });

  post.save().then((savedPost) => {
    res.json({ success: true, message: "Post saved successfully" });
  });
});

// localhost:3030/post/:postId  (UPDATE POST)
router.post("/:postId", authenticate, (req, res) => {
  const content = req.body.content;
  const caption = req.body.caption;
  const postId = req.params.postId;

  models.Post.update(
    {
      content: content,
      caption: caption,
    },
    {
      where: {
        id: postId,
      },
    }
  ).then((updatedPost) => {
    res.json({ success: true, message: "Post updated successfully" });
  });
});

// localhost:3030/post/band (GET All BANDS POST)
router.get("/band", (req, res) => {
  models.Post.findAll({
    where: {
      isBand: true,
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: models.User,
        as: "user",
      },
    ],
  }).then((posts) => res.json(posts));
});

// localhost:3030/post/search  (GET POST BY Search)
router.get("/search", (req, res) => {
  target = req.body.target;

  models.User.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.regexp]: target,
          },
        },
        {
          talent: {
            [Op.regexp]: target,
          },
        },
      ],
    },
    include: [
      {
        model: models.Post,
        as: "posts",
      },
    ],
  })
    .then((users) => {
      users.forEach((user) => {
        posts = user.posts;
      });
      res.json(posts);
    })
    .catch((error) => {
      res.json({ success: " no users found" });
    });
});

// localhost:3030/post/talent  (GET All Talent POST)
router.get("/talent", (req, res) => {
  models.Post.findAll({
    where: {
      isBand: false,
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: models.User,
        as: "user",
      },
    ],
  }).then((posts) => res.json(posts));
});

// localhost:3030/post/delete/1  (DELETE POST)
router.post("/delete/:postId", (req, res) => {
  const postId = req.params.postId;

  models.Post.destroy({
    where: {
      id: postId,
    },
  }).then((deletedPost) => {
    res.json({ success: true, message: "Post Delete Success" });
  });
});

// localhost:3030/post/my-post/1  (GET All USER POST)
router.get("/my-post/:userId", (req, res) => {
  const userId = req.params.userId;

  models.Post.findAll({
    where: {
      userId: userId,
    },
    order: [["id", "DESC"]],
  }).then((posts) => {
    res.json(posts);
  });
});

module.exports = router;
