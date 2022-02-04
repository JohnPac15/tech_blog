const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Comment, User, Post } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll().then((dbCommentData) => {
    res.json(dbCommentData);
  });
});

router.post("/", (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id,
  })
  .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
 module.exports = router;