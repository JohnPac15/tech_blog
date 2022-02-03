const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Post } = require('../models')

router.get('/', (req, res) => {
  // console.log(req.session,'session')
  Post.findAll({
    order: [['created_at', 'DESC']],
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include:[{
        model: User,
        attributes: ['username']
    }]
  })
  .then(dbPostData => {
    const post = dbPostData.map((post) => post.get({ plain: true }));
    console.log({ post });

    res.render('homepage', { post });
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