var lua = require("../src/index.js");
var path = require("path");


console.log("Should return 'hello': ");
lua.runScript("print('hello')", function() { console.log('callback successful\n'); });

lua.loadDirectory(path.resolve(__dirname + "/lua_dir"), "luaScript/", function() {
	console.log("Loaded directory - ");
	lua.loadFile(path.resolve(__dirname + "/index.lua"), "luaScript/", function() {
		console.log("Loaded file, running - \n");
		lua.runLoadedScript("luaScript/index.lua", function() { 
			console.log('callback successful\n');
			console.log('test complete, everything working as expected');
		});
	});
});


/*
var absolute = path.resolve(__dirname + "/lua_dir");
console.log(absolute + "\n" + process.cwd());
console.log(path.relative(absolute,  process.cwd()));
console.log("Loading a directory and a file: ");
*/