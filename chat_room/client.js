var net = require('net');
var client = net.Socket();    //opens TCP connection

client.connect({port: 3000, host: 'localhost'}, function(){
	console.log("connected to server");


	client.on("data", function(data){
		console.log(data.toString().trim())
	});

	process.stdin.on("data", function(input){
		client.write(input.toString().trim());
	});

	client.on("end", function(){
		console.log("disconnected from server")
	});
});
