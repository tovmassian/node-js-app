const usersController = require('../controllers/index').users;

module.exports = app => {
    app.post('/api/users', usersController.create);
    app.get('/api/users', usersController.list);
};
