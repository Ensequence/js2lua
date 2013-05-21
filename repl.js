/**
 * repl.js
 * Repl exposing internals
 *
 * (C) 2013 Steven White
 */

var repl = require('repl'),
    converter = require('./lib/converter'),
    local = repl.start('2lua> ');

local.context.converter = converter;