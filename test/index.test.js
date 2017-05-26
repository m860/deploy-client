/**
 * Created by jean.h.ma on 5/8/17.
 */
var client = require('../index');
var path = require("path");

test('archive', function () {
	client(
		'http://172.16.0.131:4000',
		path.join(__dirname, '../'),
		'dist',
		'module.exports=function(){console.log("abc")}'
	);
});