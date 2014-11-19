//---------------------------------RUN STUFF------------------------------------



/*



try {

	G.myString = "I am accessing a variable from javascript.";
	G.sendMyString = function(sent){ console.log('javascript function called, ' + sent); }


	M.FS_createPath("/", "cat/dog", true, true);
	M.FS_createDataFile("/cat/dog","js1.lua","dofile('cat/dog/js2.lua')",true,true);
	M.FS_createDataFile("/cat/dog","js2.lua","print('I can call an external lua file from an external lua file.')",true,true);

	L.execute("dofile('/cat/dog/js1.lua')"); //dofile works.
	//L.execute("print(js.global.myString) \njs.global:sendMyString('friend')"); //calling javascript works.

	/*fs.readFile('testFinal.lua', function(err, data) {
		if(err) throw err;

		M.FS_createDataFile("/", "testFinal.lua", data, true, true);
		L.execute("dofile('testFinal.lua')");
	})

	//http://stackoverflow.com/questions/13335881/redirecting-to-previous-page-after-authentication-in-node-js-using-passport


	/*fs.readdir('directory', function(err, files) {
		etc...
	});*/

	//Better
	/*npm install findit

	//listen for directories found
	var finder = require('findit').find(__dirname);
	finder.on('directory', function(dir) {
		console.log('Directory ' + dir + '/');
	});

	//Listens for files found
	finder.on('file', function(file) {
		console.log('File: ' + file);	
	});
*/

/*function loadDirectory(directory){
	fs.readdir(directory, function(err, files){
		if(err){ throw err; }
		var c=0;
		files.forEach(function(file){
			c++;
			console.log(file);
			fs.readFile(directory+file, function(err, data) { 
				if(err) { throw err; }
				M.FS_createDataFile("../piglet", file, data, true, true);
				if(0===--c) {
					console.log('done');
				}
			});
		})
	});
}

loadDirectory('../piglet');*/