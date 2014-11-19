SHELL := /bin/bash

test:
	@mocha -R spec

hint:
	@jshint dif.js test.js package.json

# UglifyJS v2
min:
	@echo -n ';' > dif.min.js; uglifyjs dif.js -o dif.min.js -c -m;

.PHONY: test hint min 