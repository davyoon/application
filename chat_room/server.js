var net = require("net");
var port = 3000;
var clients = [];
var log = [];
var counter = 0;

	
	//on connect

var server = net.createServer(function(client){
	client.write("welcome to my chatroom \n");
	clients.push(client);
	counter++;
	client.write("There are " + counter + " users in this room. \n");
	clients.forEach(function(element){
		if(client === element){
			return;
		}else{
			element.write("A new user entered the room \n");
		};	
	});


	if(log.length > 0){
		log.forEach(function(element){
			client.write(element + "\n");
		})
		
	};


	//writing data

	client.on("data", function(data){
		var message = data.toString().trim();
		var index = clients.indexOf(client);
		clients.forEach(function(element){
			if(message === "/tableflip"){
				if(element === client){
					return;
				}else{
					element.write("(╯°□°）╯︵ ┻━┻ \n");
				}
			}else if(message === "/dance"){
				if(element === client){
					return;
				}else{
					element.write("♪┏(°.°)┛┗(°.°)┓┗(°.°)┛┏(°.°)┓ ♪ \n");
				};
			}else{
				if(element === client){
					return;
				}else{
					element.write("user " + parseInt(index + 1) + ": " + message + "\n");
				};

			};

		});
		log.push(message);

	});

	//disconnect

	client.on("end", function(){
		console.log("client disconnected");
		counter--;
		var index = parseInt(clients.indexOf(client));
		var userNum = index + 1;
		clients.splice(index, 1);

		clients.forEach(function(element){
			element.write("User " + userNum + " left the room \nThere are " + counter + " users left."); 
		});

	});
});

server.listen(port, function(){
	console.log("listening on port " + port);
});