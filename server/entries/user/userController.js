const bcrypt = require('bcryptjs');
const { User } = require('../../db/client');
const authService = require('../../services/authService');
const { formValidator } = require('../../helpers/index');

function validateToken(req, res, next) {
    const token = req.headers['x-access-token'];

    authService.validateToken(token)
        .then(decoded => {
            req.decoded = decoded;
            next();
        })
        .catch(err => {
            res.status(403).send({ auth: false, message: err.message });
        });
}

function signUp(req, res) {
    const { username, password } = req.body;

    if (!formValidator(username, password)) {
        res.status(406).send('Please input valid characters!');
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    User
        .create({
            username,
            password: hashedPassword,
        })
        .then(user => {
            const token = authService.createToken(user._id);
            res.status(201).send({ status: 'signed up', auth: true, token });
        })
        .catch(error => res.status(400).send(error));
}

function signIn(req, res) {
    const { username, password } = req.body;

    if (!formValidator(username, password)) {
        res.status(406).send('Please input valid characters!');
        return;
    }
    User
        .findOne({
            where: {
                username,
            },
        })
        .then(user => {
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                res.status(401).send('Your password is incorrect!');
                return;
            }
            const token = authService.createToken(user._id);

            res.status(200).send({
                status: 'signed in',
                auth: true,
                token,
                user,
            });
        })
        .catch(error => res.status(400).send('User is not found!'));
}

function getById(req, res) {
    User
        .findById(req.params.id)
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
}

function getUsers(req, res) {
    User
        .all()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
}

module.exports = {
    signUp,
    getUsers,
    getById,
    signIn,
    validateToken,
};
