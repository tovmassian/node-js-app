const assert = require('assert');
const formValidator = require('../../../server/helpers/formValidator');

describe('formValidator', () => {
    let result;

    function initSpec({ username = 'asd123', password = 'asdf2451czx2134' } = {}) {
        result = formValidator(username, password);
    }

    it('should return true if username and password are valid', () => {
        initSpec();
        assert.equal(true, result);
    });

    it('should return false if username is empty', () => {
        initSpec({ username: '' });
        assert.equal(false, result);
    });

    it('should return false if username has invalid characters', () => {
        initSpec({ username: 'asdf}/1-' });
        assert.equal(false, result);
    });

    it('should return false if password is empty', () => {
        initSpec({ password: '' });
        assert.equal(false, result);
    });

    it('should return false if password has invalid characters', () => {
        initSpec({ password: '123a1/[' });
        assert.equal(false, result);
    });
});
