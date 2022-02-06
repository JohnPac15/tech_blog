const router = require('express').Router();
const sequelize = require('../config/connection');

router.get("/", (req, res) => {
    console.log('why!')
    res.render('coverpage')
})

module.exports = router