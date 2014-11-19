LuaNode-Runtime
===============

A quickly hacked together framework for running Lua projects and scripts in a nodejs environment without any dependencies or other nonsense, adapted from lua.vm.js.

Most of the credit should go to http://kripken.github.io/lua.vm.js/lua.vm.js.html, I'm mostly just packaging it up.

LuaNode-Runitme is being built for eventual use with https://github.com/danShumway/Piglet.  All of my maintenance and upkeep will revolve around that project - therefore I might not always be the most timely to get an issue fixed or to package something.  Use with caution, this is finished enough for my usage, not necessarily yours.

I'll package and stick it up on NPM soon.

Usage
==============

```js
var lua = require('luanode-runtime'); //Or however you want to package it.

//Loads all of the lua files in a given directory (recurses into subdirectory) to an internal directory of your choice.
//I recommend using path.resolve(__dirname + "/local/path/from/script"), to simplify and remove errors.
//Once loaded, you can call scripts from loa using dofile('internal_path/file.lua')
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
//lua.loadDirectory(path.resolve(__dirname + "/myScripts", "iPath", function() { });
//You would then run - 
//lua.runLoadedScript("iPath/subdirectory/file.lua");
//Not the external path.
lua.runLoadedScript(internal_path, callback);

```

You can see a working example in tests/index.js

ToDo
===============
Javascript and Lua still need to be able to communicate back and forth, so I'll write that up quickly before I package for NPM.
