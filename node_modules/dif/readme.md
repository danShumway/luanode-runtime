Dif.js
======

> Find the difference between two objects.

[![Build Status](https://travis-ci.org/majorleaguesoccer/dif.js.png?branch=master)](https://travis-ci.org/majorleaguesoccer/dif.js)


Install
-------

With [npm](https://npmjs.org)

```
npm install dif
```


Usage
-----

Node.js

```js
var dif = require('dif')
```

Browser

```html
<script src="dif.min.js"></script>
```

Options
-------

You can supply an options hash as the third argument to change behavior

* `preserve` - preserve nested objects (optional, default `true`)
* `depth` - nested object depth to begin preserving (optional, default `1`)
* `removed` - consider missing properties as removed (optional, default `false`)
* `sort` - sort arrays before comparison. Effectively means array ordering does not matter. (optional, default `false`)


Example
-------

Basic usage

```js
var a = {foo: 1, bar: 2}
var b = {bar: 4, baz: true}
var c = dif(a, b)
// {
//   foo: 1
// , bar: 4
// , baz: true
// }
```

We can find the diffs for nested objects as well

```js
var a = {
  one: {
    red: 2
  , blue: 3 
  , two: {
      yellow: 4
    , pink: 5
    }
  }
}
var b = {
  one: {
    two: {
      'three'
    }
  }
}
var c = dif(a, b)
{
  one: {
    two: {
      'three'
    }
  }
}
```


Release Notes
-------------
* 0.0.6 - Improved Array comparison. Added `sort` option with default to false. Array ordering now matters.


License
-------

(The MIT License)

Copyright (c) 2013 Major League Soccer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.