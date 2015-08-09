var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});


app.use(urlencodedBodyParser);

app.set('view_engine', 'ejs');

app.use(express.static('public'));

var read = fs.readFileSync('data.json', 'utf8');
if(read.length === 0){
	var mails = [];
}else{
	var mails = JSON.parse(read);
};

app.get('/', function(req, res){
	res.render('index.ejs');
});

app.get('/letters/new', function(req, res){
	res.render('new.ejs');
});

app.get('/letters/show', function(req, res){
	var id = parseInt(req.query.id);
	mails.forEach(function(mail){
		if(id === parseInt(mail.id)){
			res.render('show.ejs', {mail: mail});
		}
	});
});

app.get('/letters', function(req, res){
	res.render('history.ejs', {mails: mails});

});


app.post('/letter', function(req, res){
	console.log(req.body);
	var id = parseInt(mails[mails.length -1].id) +1;
	var mailObj = {
		id: id,
		name: req.body.name,
		address: req.body.address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		date: req.body.date,
		text: req.body.text
	};

	mails.push(mailObj);
	res.redirect('/letters');


	
})





app.listen(3000, function(){
	console.log('listening on port 3000!');
});
