/** 
 * lua-test.js
 * Generic tests for js to lua conversion
 *
 * (C) 2013 Ensequence Inc.
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
            /^".*"$/.test(result).should.be.true;
        });

        it('should contain unaltered string', function () {
            result.indexOf('test').should.equal(1);
        });
    });

    describe('null', function () {
        var result = js2lua.convert(null);

        it('should return "nil"', function () {
            result.should.equal('nil');
        });
    });

    describe('array', function () {
        var result = js2lua.convert([ 'a', 'b', 'c' ]);

        it('should enclose result in braces', function () {
            /^{.*}$/.test(result).should.true;
        });

        it('should contain the same number of entries', function () {
            result.split(',').should.have.lengthOf(3);
        });

        it('should separate each entry with a comma', function () {
            (result.split(',').length - 1).should.equal(2);
        });
    });

    describe('object', function () {
        var result = js2lua.convert({ a: 1, b: null, c: 2 });

        it('should enclose result in braces', function () {
            /^{.*}$/.test(result).should.true;
        });

        it('should contain the same number of entries', function () {
            result.split(',').should.have.lengthOf(3);
        });

        it('should separate key - value with "="', function () {
            (result.split('=').length - 1).should.equal(3);
        });

        it('should separate each entry with a comma', function () {
            (result.split(',').length - 1).should.equal(2);
        });

        it('should enclose keys in ["key"]', function () {
            result.replace(/\{|\}/g, '').split(',').forEach(function (prop) {
                /\[".*"\]/.test(prop).should.be.true;
            });
        });
    });

    describe('nested object', function () {
        var result = js2lua.convert({ a: 1, b: { c: 2, d: 3 }});

        it('should contain all objects', function () {
            (result.split('{').length - 1).should.equal(2);
            (result.split('}').length - 1).should.equal(2);
        });

        it('should contain all key / value', function () {
            (result.split('=').length - 1).should.equal(4);
        });

        it('should distinguish nested object', function () {
            var nested = result.substring(result.indexOf('["b"]'), result.length - 1);
            /\{.*\}$/.test(nested).should.be.true;
        });
    });

    describe('escaped string', function() {
        var result = js2lua.convert('\"\r\n\r\n\"\\');
        result = result.substr(1, result.length - 2);

        it('should escape \\n', function() {
            result.indexOf('\\n').should.be.above(0);
        });

        it('should escape \\r', function() {
            result.indexOf('\\r').should.be.above(0);
        });

        it('should escape \\"', function() {
            result.indexOf('\\"').should.equal(0);
        });

        it('should escape all \\n', function() {
            result.split('\\n').length.should.equal(3);
        });

        it('should escape all \\r', function() {
            result.split('\\r').length.should.equal(3);
        });

        it('should escape all \\"', function() {
            result.split('\\"').length.should.equal(3);
        });

        it('should escape all \\', function () {
            console.log(result);
            result.split('\\\\').length.should.equal(2);
        });
    })
});