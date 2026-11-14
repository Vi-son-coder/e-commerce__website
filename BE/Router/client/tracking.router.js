const express = require('express');
const router = express.Router();
const trackingController = require("../../controllers/client/tracking.controller");
const optionalAuth = require("../../middlewares/client/auth.middleware").optional;

router.post("/tracking", optionalAuth, trackingController.index);

module.exports = router;
