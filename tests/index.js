var lua = require("../src/index.js");
var path = require("path");

lua.addGlobal("myString", "String from javascript");
lua.addGlobal("myFunction", function(str) { console.log("I was told to print " + str); });


console.log("Should return 'hello': ");
lua.runScript("print('hello')", function() { console.log('callback successful\n'); });

lua.loadDirectory(path.resolve(__dirname + "/lua_dir"), "luaScript/", function() {
	console.log("Loaded directory - ");
	lua.loadFile(path.resolve(__dirname + "/index.lua"), "luaScript/", function() {
		console.log("Loaded file, running - \n");
		lua.runLoadedScript("luaScript/index.lua", function() { 
			console.log('callback successful\n');
			console.log("accessing lua var: " + lua.getGlobal('newLuaVar') + '\n');


			//----------exceptions and fun stuff-------------
			console.log('\n\ntesting exceptions and weird situations');
			console.log('this part of testing is incomplete and should be expanded');

			lua.loadDirectory('?X', '/', function(err){
				if(err) {
					console.log('got an error as expected');
				}

				lua.runScript("print('running a script with no callback')");
				console.log('\ntest complete, everything working as expected');
			});
		});
	});
});


/*
var absolute = path.resolve(__dirname + "/lua_dir");
console.log(absolute + "\n" + process.cwd());
console.log(path.relative(absolute,  process.cwd()));
console.log("Loading a directory and a file: ");
*/