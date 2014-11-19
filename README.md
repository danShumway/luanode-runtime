LuaNode-Runtime
===============

A quickly hacked together framework for running Lua projects and scripts in a nodejs environment without any dependencies or other nonsense, adapted from lua.vm.js.

Most of the credit should go to http://kripken.github.io/lua.vm.js/lua.vm.js.html, I'm mostly just packaging it up.

LuaNode-Runtime is being built for eventual use with https://github.com/danShumway/Piglet.  All of my maintenance and upkeep will revolve around that project - therefore I might not always be the most timely to get an issue fixed or to package something.  Use with caution, this is finished enough for my usage, not necessarily yours.

Installation
===============
```
npm install luanode-runtime
```

Usage
==============


```js
var lua = require('luanode-runtime');

//Loads all of the lua files in a given directory (recurses into subdirectory) to an internal directory of your choice.
//I recommend using path.resolve(__dirname + "/local/path/from/script"), to simplify and remove errors.
//Once loaded, you can call scripts from Lua using dofile('internal_path/file.lua')
//It's possible this may load other files as well, and maybe that's a thing you want for internal lua referencing?  So many possiblities!
lua.loadDirectory(directory_path, intenal_path, callback);

//See above, except with a file.
lua.loadFile(directory_path, internal_path, callback);

//Executes a lua script, and then runs the given callback.
//Pass in your script as a string.
lua.runScript(lua_script, callback);

//See above, except you pass in a previously loaded file instead.
//This will reference the path you loaded to, not the actual path.
//So if you ran - 
//lua.loadDirectory(path.resolve(__dirname + "/myScripts", "iPath", function(err) { });
//You would then run - 
//lua.runLoadedScript("iPath/subdirectory/file.lua");
//Not the external path.
lua.runLoadedScript(internal_path, callback);
```
When an error is thrown by the fileloaders or within the lua script, it is handled differently depending on whether or not a callback was provided.  If not provided, the error will be thrown as normal.  Otherwise, the callback will be called immediately and passed the error.

```js
//This will throw an exception in lua (cannot add string and number)
lua.runScript("print('a' + 1)", function(err){
  if(err) {
    console.log("LUA ERROR: " + err.message);
  }
});
```

Javascript can insert variables and methods into Lua scope

```js
var lua = require('luanode-runtime');

//Pass in a name, and the object that you want to send.
lua.setGlobal("jsVar", "hello from javascript");
lua.setGlobal("jsMethod", function(str) { console.log(str); });
```

Lua scripts can now access a global scope at js.global

```lua
print(js.global.jsVar) --prints "hello from javascript"
js.global.newLuaVar = "hello from lua" --Will now be accessible from within javascript.
js.global:jsMethod("My Lua string"); --Note the syntax difference.
```

```js
console.log(lua.getGlobal("newLuaVar")); //Prints "hello from lua"
```

You can see a complete working example in tests/index.js
