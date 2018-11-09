const users = require('./users');

module.exports = app => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    users(app);
};
