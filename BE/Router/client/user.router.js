const express = require('express');
const userController = require('../../controllers/client/users.controller')
const router = express.Router();

router.get('/',userController.index);
router.patch('/add',userController.add);

module.exports = router;