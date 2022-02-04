const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

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
    // console.log(req.session.loggedIn);

    res.render('homepage', { 
      post,
      loggedIn: req.session.loggedIn });
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

module.exports = router