const router = require('express').Router();

const apiRoutes= require('./api');
const homePage = require('./homepage-routes.js');
const dashboardRoutes = require('./dashboard-routes.js')

router.use('/api', apiRoutes)
router.use('/', homePage);
router.use('/dashboard', dashboardRoutes)

module.exports = router;