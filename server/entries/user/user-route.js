const express = require('express');
const usersController = require('./user-controller');

const router = express.Router();

router.post('/users', usersController.create);
router.get('/users', usersController.list);

module.exports = router;
