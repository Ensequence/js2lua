/**
 * converter.js
 * Main lua conversion logic
 *
 * (C) 2013 Steven White
 */

// ### Exports
module.exports = (function () {

    // ### convert
    // Converts object to lua representation
    //
    // * `obj`: object to converts
    function convert (obj) {
        // Get type of obj
        var type = typeof obj;

        // Handle type
        if (~['number', 'boolean'].indexOf(type)) {
            // Return obj if simple type
            return obj;
        } else if (type === 'string') {
            return '"' + obj + '"';
        } else if (type === 'undefined' || obj === null) {
            // Return 'nil' for null || undefined
            return 'nil';
        } else if (Array.isArray(obj)) {
            // Convert each item in array
            return '{' + obj.map(convert).join(',') + '}';
        } else {
            // Lua string
            var lua = '{';

            // Build out each property
            var props = [];
            for (var key in obj) {
                props.push('["' + key + '"] = ' + convert(obj[key]));
            }

            // Join properties
            lua += props.join(', ') + ' }';
            return lua;
        }
    }

    // Expose methods
    return {
        convert: convert
    };
})();