const { User } = require('../../db/client');

module.exports = {
    create(req, res) {
        return User
            .create({
                username: req.body.username,
                password: req.body.password,
                someToken: req.body.authToken,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },

    list(req, res) {
        return User
            .all()
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },
};
