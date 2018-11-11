const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('./authConfig');

function createToken(id) {
    return jwt.sign({ id }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
    });
}

function validateToken(token) {
    const verify = util.promisify(jwt.verify);

    return verify(token, config.secret);
}

module.exports = {
    createToken,
    validateToken,
};
