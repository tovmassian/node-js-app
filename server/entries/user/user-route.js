const express = require('express');
const usersController = require('./user-controller');

const router = express.Router();

router.post('/user', usersController.create);
router.get('/user', usersController.list);

module.exports = router;
