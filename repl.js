/**
 * repl.js
 * Repl exposing internals
 *
 * (C) 2013 Ensequence Inc.
 */

var repl = require('repl'),
    converter = require('./lib/converter'),
    local = repl.start('2lua> ');

local.context.converter = converter;