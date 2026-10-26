const express = require('express');
const router = express.Router();
const trackingController = require("../../controllers/client/tracking.controller");

router.post("/tracking", trackingController.index);

module.exports = router;
