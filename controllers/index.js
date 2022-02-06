const router = require('express').Router();

const apiRoutes= require('./api');
const homePage = require('./homepage-routes.js');
const dashboardRoutes = require('./dashboard-routes.js')
const coverpage = require("./coverpage-route.js")

router.use('/api', apiRoutes)
router.use('/main', homePage);
router.use('/dashboard', dashboardRoutes)
router.use("/", coverpage)

module.exports = router;