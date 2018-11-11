const bcrypt = require('bcryptjs');
const { User } = require('../../db/client');
const authService = require('../../services/authService');

function signUp(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User
        .create({
            username: req.body.username,
            password: hashedPassword,
        })
        .then(user => {
            const token = authService.createToken(user._id);

            res.status(201).send({ status: 'signed up', auth: true, token });
        })
        .catch(error => res.status(400).send(error));
}

function signIn(req, res) {
    User
        .findOne({
            where: {
                username: req.body.username,
            },
        })
        .then(user => {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token = authService.createToken(user._id);
                res.status(200).send({
                    status: 'signed in',
                    auth: true,
                    token,
                    user,
                });
            } else {
                res.status(400).send('Your password is incorrect!');
            }
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

function isFieldEmpty(field) {
    return !field;
}

function isValidCharacters(field) {
    return field === field.replace(/[^a-zA-Z0-9]/g, '');
}

function validateFields(req, res, next) {
    const { body } = req;
    if (!isFieldEmpty(body.username)
    && !isFieldEmpty(body.password)
    && isValidCharacters(body.username)
    && isValidCharacters(body.password)) {
        next();
    } else {
        res.send('Don\'t fuck me please\'Sorry but username or password is empty');
    }
}

function validateUserToken(req, res, next) {
    const token = req.headers['x-access-token'];

    authService.validateToken(token)
        .then(decoded => {
            req.decoded = decoded;
            next();
        })
        .catch(err => {
            res.status(500).send({ auth: false, message: err.message });
        });
}

module.exports = {
    signUp,
    getUsers,
    getById,
    signIn,
    validateFields,
    validateUserToken,
};
