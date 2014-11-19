(function() { "use strict"; })();

var fs = require("fs");
var rfs = require('recursive-readdir');
var diffJS = require("diff");
var path = require('path');


var lua = require("./lua.vm.js");
var L = lua.Lua;
var M = lua.module;
var G = lua.global;


//--------------------DIRECTORY SETUP------------------------------------------------

var loadDirectory = function(base_path, internal_path, callback) {
	rfs(base_path, ['*.json', '*.txt', '*.md'], function(err, files) {
		var c=0;
		files.forEach(function(file){
			c++;
			//console.log(file);
			fs.readFile(file, function(err, data) { 
				if(err) { throw err; }
				//console.log(path.dirname(file));
				base = "";
				diffJS.diffChars(file, base_path).forEach(function(part){
					if(part.added || part.removed) {
						base+=part.value;
					}
				});
				base = path.normalize(internal_path + path.dirname(base)).split("\\").join("/");
				M.FS_createPath("/", base, true, true);

				var filename = path.basename(file);
				M.FS_createDataFile(base, filename, data, true, true);
				if(0===--c) {
					console.log('loaded ' + base_path);
					callback();
				}
			});
		});
	});
};

var loadFile = function(base_path, internal_path, callback) {
	fs.readFile(file, function(err, data) { 
		if(err) { throw err; }
		base = "";
		diffJS.diffChars(file, base_path).forEach(function(part){
			if(part.added || part.removed) {
				base+=part.value;
			}
		});
		base = path.normalize(internal_path + path.dirname(base)).split("\\").join("/");
		M.FS_createPath("/", base, true, true);

		var filename = path.basename(file);
		M.FS_createDataFile(base, filename, data, true, true);
		callback();
	});
};

//--------------Execution----------------------------------------------

//You can pass in any lua script as a string.  You can call dofile on other loaded scripts.
var runScript = function(lua_script, callback) {
	try {
		L.execute(lua_script);
	} catch(e) {
		console.log("LUA EXCEPTION: ");
		console.log("	" + e.message);
	}
};

//Note that when calling this, you should pass in the path of a loaded file (not an external file)
var runLoadedScript = function(internal_path, callback) {
	try {
		L.execute("dofile('"+internal_path+"')");
	} catch(e) {
		console.log("LUA EXCEPTION: ");
		console.log("	" + e.message);
	}
}

//----------------------------------------------------------------------

module.exports.loadDirectory = loadDirectory;
module.exports.loadFile = loadFile;
module.exports.runScript = runScript;
module.exports.runLoadedScript = runLoadedScript;