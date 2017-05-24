var tar = require('tar');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var fstream = require("fstream");

module.exports = function (root, dist, scriptText) {

	var tempPath = path.join(root, 'temp');
	var packagePath = path.join(tempPath, 'package');
	var scriptPath = path.join(tempPath, 'script.js');
	var zipPath = path.join(root, 'package.tar');

	function rmTemp() {
		if (fs.existsSync(tempPath)) {
			console.log('delete temp path')
			fse.remove(tempPath);
		}
		else {
			console.log('temp path is not exists')
		}
	}

	fse.copySync(dist, packagePath);
	fs.writeFileSync(scriptPath, scriptText, 'utf8');
	//archive
	var zip = fs.createWriteStream(zipPath);

	function onError(err) {
		console.error('An error occurred:', err);
		rmTemp();
	}

	function onEnd() {
		console.log('Packed!');
		rmTemp();
	}

	var packer = tar.Pack({noProprietary: true})
		.on('error', onError)
		.on('end', onEnd);
	return fstream.Reader({
		path: tempPath
	})
		.on('error', onError)
		.pipe(packer)
		.pipe(zip);
};
