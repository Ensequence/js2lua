/**
 * converter.js
 * Main lua conversion logic
 *
 * (C) 2013 Ensequence Inc.
 */

// ### Exports
module.exports = (function () {

    var whitespace = 0;

    // ### convert
    // Converts object to lua representation
    //
    // * `obj`: object to converts
    // * `indentation`: spaces to indent
    function convert (obj, indentation) {
        // Setup whitespace
        if (indentation && typeof indentation === 'number') whitespace = indentation, indentation = '';

        // Get type of obj
        var type = typeof obj;

        // Handle type
        if (~['number', 'boolean'].indexOf(type)) {
            return obj;
        } else if (type === 'string') {
            return '"' + escapeString(obj) + '"';
        } else if (type === 'undefined' || obj === null) {
            // Return 'nil' for null || undefined
            return 'nil';
        } else {
            // Object
            // Increase indentation
            for (var i = 0, previous = indentation || '', indentation = indentation || ''; i < whitespace; indentation += ' ', i++);

            // Check if array
            if (Array.isArray(obj)) {
                // Convert each item in array, checking for whitespace
                if (whitespace) return '{\n' + indentation + obj.map(function (prop) { return convert(prop, indentation); }).join(',\n' + indentation) + '\n' + previous + '}';
                else return '{' + obj.map(function (prop) { return convert(prop); }).join(',') + '}';
            } else {
                // Build out each property
                var props = [];
                for (var key in obj) {
                    props.push('["' + key + '"]' + (whitespace ? ' = ' + convert(obj[key], indentation) : '=' + convert(obj[key])));
                }

                // Join properties && return
                if (whitespace) { return '{\n' + indentation + props.join(',\n' + indentation) + '\n' + previous + '}'; }
                else return '{' + indentation + props.join(',') + '}';
            }
        }
    }

    // ### escapeString
    // Escape string for serialization to lua object
    //
    // * `str`: string to escape
    function escapeString(str) {
        return str
            .replace(/\n/g,'\\n')
            .replace(/\r/g,'\\r')
            .replace(/"/g,'\\"')
            .replace(/\\/g, '\\\\');
    }

    // Expose methods
    return {
        convert: convert
    };
})();