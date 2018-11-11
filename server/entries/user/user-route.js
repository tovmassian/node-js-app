const express = require('express');
const userController = require('./user-controller');

const router = express.Router();

router
    .route('/signup')
    .all(userController.validateFields)
    .post(userController.signUp);

router
    .route('/signin')
    .all(userController.validateFields)
    .post(userController.signIn);

router
    .route('/profile')
    .all(userController.validateUserToken)
    .get((req, res) => res.send(req.decoded));

router
    .route('/users/:id')
    .get(userController.getById);

router
    .route('/users')
    .get(userController.getUsers);

module.exports = router;
