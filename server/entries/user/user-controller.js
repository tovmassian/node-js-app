const { User } = require('../../db/client');

function create(req, res) {
    User
        .create({
            username: req.body.username,
            password: req.body.password,
            authToken: req.body.authToken,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
}

function list(req, res) {
    User
        .all()
        .then(user => res.status(200).send(user))
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

module.exports = {
    create,
    list,
    validateFields,
};
