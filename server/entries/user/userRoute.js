const express = require('express');
const userController = require('./userController');

const router = express.Router();

router
    .post('/users', userController.signUp);

router
    .get('/users/:id', userController.getById);

router
    .get('/users', userController.getUsers);

router
    .post('/signin', userController.signIn);

router
    .route('/profile')
    .all(userController.validateToken)
    .get((req, res) => res.status(200).send(req.decoded));

module.exports = router;
