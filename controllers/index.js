const router = require('express').Router();

const homePage = require('./homepage-routes.js');

router.use('/', homePage);

module.exports = router;