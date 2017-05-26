/**
 * Created by jean.h.ma on 26/05/2017.
 */
var request = require("request");
var path = require("path")
var fs = require("fs")
test('upload tar', function () {
	var tarPackage = path.join(__dirname, '../package.tar');
	console.log(tarPackage)
	request.post({
		url: "http://172.16.0.131:4000",
		// url: "http://127.0.0.1:4000",
		formData: {
			package: fs.createReadStream(tarPackage)
		}
	}, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log('upload success');
		// fs.unlink(tarPackage);
	});
});