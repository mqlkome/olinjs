//1. console.log("HELLO WORLD");

//2.process.argv results in ['node', 'path/program.js', '1', '2', '3'] 
//var sum = 0;
//for (i = 2; i<process.argv.length; i++){
//	sum += Number(process.argv[i]);
//}
//console.log(sum)

//3. var fs = require('fs');
//var str = fs.readFileSync(process.argv[2]).toString();
//var lines = str.split("\n");
//console.log(lines.length-1);

//4. var fs = require('fs');
//fs.readFile(process.argv[2], function (error, data){
//var text = data.toString()
//var lines = text.split("\n")
//console.log(lines.length-1)
//});

//5.var fs = require('fs');
//var path = require('path');
//var dir = process.argv[2];
//var check = "." + process.argv[3];
//fs.readdir(dir, function(error, list){
//	for (i=0; i<list.length; i++){
//		var ext = path.extname(list[i]);
//		if (ext === check){console.log(list[i]);}
//	}
//});

//6.
//var filterfunction = require('./module.js');
//filterfunction(process.argv[2], process.argv[3], function(error, list){
//  if (error){console.log('An error occurred', error)}
//  for (i=0; i<list.length; i++){
//	  console.log(list[i]);
//	}
//})

//7.
//var http = require('http');
//http.get(process.argv[2], function(response){
//response.setEncoding("utf8");
//response.on("data", console.log);
//})

//8.
//var bl = require('bl');
//var http = require('http');
//http.get(process.argv[2], function(response){
//  response.pipe(bl(function(err, data){
//  console.log(data.length);
//  console.log(data.toString());
//  }));
//});

//9.
//var bl = require('bl');
//var http = require('http');
//var count = 0;
//var first = ""
//var second = ""
//var third = ""
//http.get(process.argv[2], function(response){
//  response.pipe(bl(function(err, data){
//  first = data.toString();
//  count += 1;
//  if (count === 3){logNow()}
//  }));
//});
//http.get(process.argv[3], function(response){
//  response.pipe(bl(function(err, data){
//  second = data.toString();
//  count += 1;
//  if (count === 3){logNow()}
//  }));
//});
//http.get(process.argv[4], function(response){
//  response.pipe(bl(function(err, data){
//  third = data.toString();
//  count +=1
//  if (count === 3){logNow()}
//  }));
//});
//function logNow(){console.log(first); console.log(second); console.log(third);}

//10.
//var net = require('net')
// var strftime = require('strftime')
// var server = net.createServer(function(socket){
    // var date = strftime('%Y-%m-%d %k:%M')
    // socket.end(date)
// })
// server.listen(process.argv[2])


 
