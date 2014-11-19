
var dif = require('./index')
  , assert = require('assert')
  , ase = assert.strictEqual
  , ade = assert.deepEqual
  , at = assert.throws
  , info = require('./package.json')

describe('dif.js', function() {
  it('should have the correct version', function() {
    ase(dif.VERSION, info.version)
  })

  it('should work with simple properties', function() {
    var a = {
      foo: 'asdf'
    , bar: 2
    , baz: 3
    }
    var b = {
      foo: 'meow'
    , bar: 2
    , baz: true
    }
    var c = dif(a, b)
    ase(c.foo, 'meow')
    ase(c.bar, undefined)
    ase(c.baz, true)
  })

  it('should preserve keys', function() {
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
        red: 5
      }
    }
    var c = dif(a, b)
    ade(c, { one: { red: 5 } })
    
    var c = dif(a, b, {
      depth: 3
    })
    ade(c, { one: { red: 5, blue: 3, two: { yellow: 4, pink: 5 } } })
    
    var c = dif(a, b, {
      preserve: false
    })
    ade(c, { one: { red: 5, blue: 3, two: { yellow: 4, pink: 5 } } })
  })
  
  it('should work with nested objects', function() {
    var a = {
      hi: {
        one: 1
      , two: 2
      , nest: {
          bird: 'bird'
        }
      }
    , another: {
        well: 'there'
      }
    , thing: {
        meow: {
          a: 20
        }
      }
    }
    var b = {
      hi: {
        one: 1
      , two: 2
      , nest: {
          bird: 'bird'
        }
      }
    , another: true
    , thing: {
        cat: 20
      , meow: {
          a: 'hi'
        }
      }
    }
    var c = dif(a, b)
    ase(c.hi, undefined)
    ase(c.another, true)
    ase(c.thing.cat, 20)
    ase(c.thing.meow.a, 'hi')
  })
  
  it('should work with arrays (sorted)', function() {
    var a = {
      foo: [1,2,3]
    , bar: ['a', 'b', true]
    , baz: ['1', true, 30]
    }
    var b = {
      foo: [2,3,1]
    , bar: [true, 'a', 'b']
    , baz: ['2', false, '20']
    }
    var c = dif(a, b, { sort: true })
    ase(c.foo, undefined)
    ase(c.bar, undefined)
    ase(c.baz.toString(), '2,false,20')
    ase(c.baz[1], false)

    var d = dif(a, b)
    ase(d.foo, b.foo)
    ase(d.bar, b.bar)
    ase(d.baz.toString(), '2,false,20')
    ase(d.baz[1], false)
  })

  it('should work with arrays (non-sorted)', function() {
    var a = {
      foo: [1,2,3]
    , bar: ['a', 'b', true]
    , baz: ['1', true, 30]
    }
    var b = {
      foo: [2,3,1]
    , bar: [true, 'a', 'b']
    , baz: ['2', false, '20']
    }

    var d = dif(a, b)
    ase(d.foo, b.foo)
    ase(d.bar, b.bar)
    ase(d.baz.toString(), '2,false,20')
    ase(d.baz[1], false)
  })

  it('should work with missing properties', function() {
    var a = {
      hi: 'there'
    }
    var b = {
      hello: 'you'
    , whats: 'up?'
    }
    var c = dif(a, b)
    ase(c.hi, 'there')
    ase(c.hello, 'you')
    ase(c.whats, 'up?')
  })

  it('should preserve nested properties with depths', function() {
    var a = {
      one: {
        a: 1
      , b: 2
      , c: 3
      , two: {
          red: 'red'
        , blue: 'blue'
        , pink: 'pink'
        , three: {
            hi: true
          , there: false
          , blah: 20
          }
        }
      }
    }
    var b = {
      one: {
        a: 4
      , two: {
          three: {
            hi: 'meow'
          }
        }
      }
    }
    var c = dif(a, b, {preserve: true, depth: 1})
    ade(c, { 
      one: { 
        a: 4
      , two: { 
          three: { 
            hi: 'meow' 
          } 
        } 
      } 
    })
    var d = dif(a, b, {preserve: true, depth: 2})
    ade(d, {
      one: {
        a: 4
      , two: {
          three: {
            hi: 'meow'
          }
        }
      , b: 2
      , c: 3
      }
    })
    var e = dif(a, b, {preserve: true, depth: 3})
    ade(e, {
      one: {
        a: 4
      , two: {
          three: {
            hi: 'meow'
          }
        , red: 'red'
        , blue: 'blue'
        , pink: 'pink'
        }
      , b: 2
      , c: 3
      }
    })
    var f = dif(a, b, {preserve: false})
  })

  it('should preserve nested properties', function() {
    var a = {
      a: { 
        b: 'Win',
        c: '13',
        d: '13',
        e: 0 
      },
      f: { 
        g: 'Lose',
        h: '149',
        i: '149',
        j: 0 
      }
    }

    var b = { 
      a: {
        b: 'Win',
        c: '13',
        d: '13',
        e: 0 
      },
      f: { 
        g: 'Lose',
        h: '150',
        i: '150',
        j: 0 
      }
    }
    var c = dif(a, b, {preserve: true})
    var d = dif(a, b, {preserve: false})
  })

  it('should work with all object types', function() {
    var a = {
      a: 1
    , b: ['a', 2, false]
    , c: {
        d: 3
      , e: true
      , f: new Date(2010)
      , g: {
          h: /g+/
        , i: new RegExp(/^g+$/)
        , j: NaN
        }
      }
    }
    var b = {
      a: 1
    , b: [2, false, 'a']
    , c: {
        d: 3
      , e: true
      , f: new Date(2010)
      , g: {
          h: /g+/
        , i: new RegExp(/^g+$/)
        , j: NaN
        }
      }
    }
    var c = dif(a, b, { sort: true })
    ase(Object.keys(c).length, 0)
  })

  it('should consider missing keys as removed', function() {
    var a = {
      one: 1
    , two: 2
    , three: 3
    }
    var b = {
      three: 4
    }
    var c = dif(a, b, {
      removed: true
    })
    ase(c.three, 4)
    ase(c.one, undefined)
    ase(c.two, undefined)
    ase('one' in c, true)
    ase('two' in c, true)
  })

  it('should throw an error for non-object args', function() {
    at(function() { dif({}, true) }, TypeError)
    at(function() { dif() }, TypeError)
    at(function() { dif(1, 2) }, TypeError)
    at(function() { dif([], {}) }, TypeError)
  })
})
