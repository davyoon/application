var net = require("net");
var port = 3000;

var server = net.createServer(function(c){
	console.log("client connected");
	c.write("Ask a yes or no question");
	c.on("data", function(data){
		var question = data.toString().trim();
		if(/\w+\?/g.test(question)){
		var array = ["Definitely", "Yes", "Ask again later", "AHAHAHHAH    No..", "I doubt it", "There is a possibility"];
		var answer = Math.floor(Math.random()*array.length);
		c.write(array[answer] + "\n");
		}else{
			c.write("ask a question please \n");
		};
	});

	c.on("end", function(){
		console.log("client disconnected");
	});
});

server.listen(port, function(){
	console.log("listening on port " + port);
});