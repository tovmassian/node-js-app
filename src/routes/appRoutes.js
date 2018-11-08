const express = require('express');
const appRouter = express.Router();
const appController = require('../controllers/appController');

function router() {
    const {
        register,
        middleware,
        getLoginMessage,
    } = appController();

    appRouter.route(`/register`)
        .post(register);
    appRouter.route(`/login`)
        .all(middleware)
        .get(getLoginMessage);

    return appRouter;
}

module.exports = router;