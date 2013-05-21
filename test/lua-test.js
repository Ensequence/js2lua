/** 
 * lua-test.js
 * Generic tests for js to lua conversion
 *
 * (C) 2013 Steven White
 */

// ### Dependencies
var should = require('should'),
    js2lua = require('./../');

describe('convert(** type **)', function () {

    describe('number', function () {
        var result = js2lua.convert(1);

        it('should return a number', function () {
            result.should.be.a('number');
        });

        it('should return the same value', function () {
            result.should.equal(1);
        });
    });

    describe('boolean', function () {
        var result = js2lua.convert(true);

        it('should return a boolean', function () {
            result.should.be.a('boolean');
        });

        it('should return the same value', function () {
            result.should.equal(true);
        });
    });

    describe('string', function () {
        var result = js2lua.convert('test');

        it('should return a string', function () {
            result.should.be.a('string');
        });

        it('should enclose result in double quotes', function () {
            /^".*"$/.test(result).should.be.ok;
        });

        it('should contain unaltered string', function () {
            result.indexOf('test').should.equal(1);
        });
    });

    
});