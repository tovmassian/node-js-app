const { User } = require('../../db/client');

function create(req, res) {
    return User
        .create({
            username: req.body.username,
            password: req.body.password,
            authToken: req.body.authToken,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
}

function list(req, res) {
    return User
        .all()
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error));
}

module.exports = {
    create,
    list,
};
