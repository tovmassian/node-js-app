const inputValidator = require('./inputValidator');

module.exports = (username, password) => username
                                        && password
                                        && inputValidator(username)
                                        && inputValidator(password);
