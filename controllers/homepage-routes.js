const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', (req, res) => {
  // console.log(req.session,'session')
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
  .then(dbPostData => {
    const post = dbPostData.map((post) => post.get({ plain: true }));
    console.log(post[3].comments);

    res.render('homepage', { 
      post,
      loggedIn: req.session.loggedIn });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get("/post/:id", withAuth,  (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "created_at",
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id " });
        return;
      }
      
      const post = dbPostData.get({ plain: true });
      console.log(post, 'yep this one')

      res.render('post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('login');
})

router.get('/signup', (req, res) => {
  if(req.session.loggedIn){
    res.redirect('/');
    return;
  }
  res.render('signup');
})

module.exports = router