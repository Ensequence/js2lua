## js2lua

Provides easy conversion of javascript objects into lua table representation.

[![Build Status](https://travis-ci.org/Ensequence/js2lua.png)](https://travis-ci.org/Ensequence/js2lua)
[![NPM version](https://badge.fury.io/js/js2lua.png)](http://badge.fury.io/js/js2lua)
[![Dependencies](https://gemnasium.com/Ensequence/js2lua.png)](https://gemnasium.com/Ensequence/js2lua)

## Installation

```bash
$ npm install js2lua
```

## Tests

```bash
$ npm test
```

## API

#### convert(obj, indentation)

Convert object to lua syntax.

* `obj`: object to convert
* `indentation`: [Optional] spaces to indent

## Example

Basic usage:

```javascript

var js2lua = require('js2lua'),
    input = { a: [ 'abc', 'def'], b: { a: 1, b: 2}, c: '1234'};

console.log(js2lua.convert(input))

// output:
// '{["a"] = {"abc","def"}, ["b"] = { ["a"] = 1, ["b"] = 2 }, ["c"] = "1234" }

```

[Express](https://github.com/visionmedia/express) content negotiation:

```javascript
var js2lua = require('js2lua');

// Lua Middleware
app.use(function (req, res, next) {
    // Get reference to original send
    var expressSend = res.send;

    // Redefine send to convert body if necessary
    res.send = function (body) {
        // Check accept header
        if (req.headers.accept && req.headers.accept == 'application/lua') {
            // Convert body && set content type
            body = js2lua.convert(body);
            res.set('Content-Type', 'application/lua');
        }

        // Deliver result
        expressSend.apply(res, arguments);
    }
    next();
});

// Add app.router AFTER
app.use(app.router);
```

[Restify](https://github.com/mcavage/node-restify/) content negotiation:

```javascript
var js2lua = require('js2lua');

restify.createServer({
    formatters: {
        'application/lua': function formatLua (req, res, body) {
            return js2lua.convert(body);
        }
    }
});
```

## License

(The MIT License)

Copyright (c) 2013 Ensequence Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.