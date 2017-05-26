var tar = require('tar');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var fstream = require("fstream");
var request = require("request");

module.exports = function (url, root, dist, scriptText) {
	console.log('url : ' + url);
	var tempPath = path.join(root, 'temp');
	var packagePath = path.join(tempPath, 'package');
	var scriptPath = path.join(tempPath, 'script.js');
	var zipPath = path.join(root, 'package.tar');
	var distPath = path.join(root, dist);

	console.log('dist path : ' + distPath);

	function rmTemp() {
		if (fs.existsSync(tempPath)) {
			console.log('delete temp path')
			fse.remove(tempPath);
		}
		else {
			console.log('temp path is not exists')
		}
	}

	fse.copySync(distPath, packagePath);
	fs.writeFileSync(scriptPath, scriptText, 'utf8');
	//archive
	var zip = fs.createWriteStream(zipPath);

	function onError(err) {
		console.error('an error occurred:', err);
		// rmTemp();
	}

	function onEnd() {
		console.log('pack success !');
		// rmTemp();
	}

	var packer = tar.Pack({noProprietary: true})
		.on('error', onError)
		.on('end', onEnd);

	var reader = fstream.Reader({path: tempPath}).pipe(packer).pipe(zip);
	reader.on('error', onError);
	reader.on('finish', function () {
		console.log('finsh');
		// var tarPackage=path.join(root,'package.tar');
		// request.post({
		// 	url: url,
		// 	formData: {
		// 		package: fs.createReadStream(tarPackage)
		// 	}
		// }, function (err) {
		// 	if (err) {
		// 		return console.error(err);
		// 	}
		// 	console.log('upload success');
		// 	fs.unlink(tarPackage);
		// });
	});
};
