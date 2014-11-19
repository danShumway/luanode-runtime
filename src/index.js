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
	//Not sure if I should be ignoring this stuff or not to be honest.
	rfs(base_path, ['*.json', '*.txt', '*.md'], function(err, files) {

		if(err) {
			if(callback){
				callback(err); return;
			} else {
				throw err;
			}
		}

		var c=0;
		files.forEach(function(file){
			c++;
			//console.log(file);
			fs.readFile(file, function(err, data) { 
				if(err) { 
					if(callback){
						callback(err); return; 
					} else {
						throw err;
					}
				}

				try {
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

						if(callback) {
							callback();
						}
					}
				} catch (err) {
					if(callback){
						callback(err); return; 
					} else {
						throw err;
					}
				}
			});
		});
	});
};

var loadFile = function(base_path, internal_path, callback) {
	fs.readFile(base_path, function(err, data) { 
		
		if(err) {
			if(callback){
				callback(err); return; 
			} else {
				throw err;
			}
		}

		try {
			base = "";
			diffJS.diffChars(base_path, base_path).forEach(function(part){
				if(part.added || part.removed) {
					base+=part.value;
				}
			});
			base = path.normalize(internal_path + path.dirname(base)).split("\\").join("/");
			M.FS_createPath("/", base, true, true);

			var filename = path.basename(base_path);
			M.FS_createDataFile(base, filename, data, true, true);

			if(callback) {
				callback();
			}
		} catch(err) {
			if(callback){
				callback(err); return; 
			} else {
				throw err;
			}
		}
	});
};

//--------------Execution----------------------------------------------

//You can pass in any lua script as a string.  You can call dofile on other loaded scripts.
var runScript = function(lua_script, callback) {
	try {
		L.execute(lua_script);
	} catch(err) {
		if(callback){
			callback(err); return; 
		} else {
			throw err;
		}
	}

	if(callback) {
		callback();
	}
};

//Note that when calling this, you should pass in the path of a loaded file (not an external file)
var runLoadedScript = function(internal_path, callback) {
	try {
		L.execute("dofile('"+internal_path+"')");
	} catch(err) {
		if(callback){
			callback(err); return; 
		} else {
			throw err;
		}
	}

	if(callback) {
		callback();
	}
}

//-------------Sending and Getting Variables/Methods-----------------------

//Adds an object or function or whatever to a Lua Accessible scope.
var addGlobal = function(name, global_object) {
	G[name] = global_object;
}

//Gets an object in the Lua Accessible scope 
//(this can include variables included from )
var getGlobal = function(name) {
	return G[name];
}


//--------------------------------------------------------------------------

module.exports.loadDirectory = loadDirectory;
module.exports.loadFile = loadFile;
module.exports.runScript = runScript;
module.exports.runLoadedScript = runLoadedScript;
module.exports.addGlobal = addGlobal;
module.exports.getGlobal = getGlobal;