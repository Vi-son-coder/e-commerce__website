const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboard.controller');
const requireAdmin = require("../../middlewares/admin/requireAdmin");

router.use(requireAdmin);
router.get('/',dashboardController.index);

module.exports = router;