var net = require("net");
var port = 3000;
var fs = require("fs");

var server = net.createServer(function(c){
	// c.write("enter pw");
	// c.on("data", function(data){
	// 	if(input === "1234"){

	// 	}else{
	// 		c.
	// 	}
	// })
	var number = 0;


	c.write("Press 1 to see all messages" + "\n" + "Press 2 to empty inbox" + "\n" + "Press 3 and message number to delete specific message" + "\n" + "Or just enter message to leave message");
	
	c.on("data", function(data){

		var array = data.toString().split(" ");

		var string = fs.readFileSync("data.json", "utf8");

			if(string.length === 0){
				var inbox = {};
			}else{
				var inbox = JSON.parse(string);
			}


			if(array[0] === "1"){
				c.write(string);
			} else if(array[0] === "2"){
				var inbox = {};
				fs.writeFileSync("data.json", JSON.stringify(inbox));

			}else if(array[0] === "3"){
				var toDelete = array[1];
				delete inbox[toDelete];
				fs.writeFileSync("data.json", JSON.stringify(inbox));
				
			}else{
				var message = array.join(" ");
				number++;
				inbox[number] = message;
				fs.writeFileSync("data.json", JSON.stringify(inbox));
			}



	})


	c.on("end", function(){
		console.log("client disconnected");
	});

});

server.listen(port, function(){
	console.log("listening on " + port);




// inbox.filter(function(element){
// 	return Object.keys(element).indexOf("1") > -1;
// })


});