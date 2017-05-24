/**
 * Created by jean.h.ma on 5/8/17.
 */
var client=require('../index');
var path=require("path");

test('archive',function(){
	client(path.join(__dirname,'../dist'),'module.exports=function(){console.log("abc")}');
})