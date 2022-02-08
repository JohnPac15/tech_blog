const router = require('express').Router();
const sequelize = require('../config/connection');

router.get("/", (req, res) => {
    res.render('coverpage', {loggedIn: req.session.user_id})
})

module.exports = router