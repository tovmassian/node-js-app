const assert = require('assert');
const inputValidator = require('../../../server/helpers/inputValidator');

describe('inputValidator', () => {
    let result;

    function initSpec({ value = 'asd123' } = {}) {
        result = inputValidator(value);
    }

    it('should return true if input value has only valid characters', () => {
        initSpec();
        assert.equal(true, result);
    });

    it('should return false if input value has invalid characters', () => {
        initSpec({ value: 'something?asd!12+' });
        assert.equal(false, result);
    });
});
