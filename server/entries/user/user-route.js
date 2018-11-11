const express = require('express');
const usersController = require('./user-controller');

const router = express.Router();

router
    .route('/users')
    .all(usersController.validateFields)
    .post(usersController.create);

router.get('/users', usersController.list);

module.exports = router;
