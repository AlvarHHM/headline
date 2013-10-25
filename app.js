
/**
 * Module dependencies.
 */
var images1 =  ['images/demo/field.jpg', 'images/demo/gnome.jpg', 'images/demo/pencils.jpg', 'images/demo/golf.jpg'];
var images2 =  ['images/demo/field.jpg', 'images/demo/golf.jpg'];
headlines = [
  {id: 1, title: 'one', images: images1},
  {id: 2, title: 'two', images: images2}
]
activities = [
]
insightData = {
	xs: ['Jan', 'Feb', 'Mar'],
	ys: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7]
            }]
	}

var express = require('express')
	, app = express.createServer()
 	, io = require('socket.io').listen(app, {origins: '*:*'});	

 	app.use(express.bodyParser());

// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });

// require('./http_controllers')(app);
// require('./models');

app.get('/', function(req, res) {
	res.render('index', {title: 'Testers'})
});

app.get('/test', function(req, res) {
	res.render('test', {title: 'SocketTest'})
});

app.get('/headlines', function(req, res) {
	res.send(JSON.stringify(headlines));
});

app.get('/newInsightData', function(req, res) {
	res.send(JSON.stringify(insightData));
});

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set("json callback", true);
	app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.cookieParser());
  app.use(express.logger({ format: ':method :url' }));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

io.sockets.on('connection', function (socket) {
	// socket.on('activity', function(e) {
	// 	console.log("--------activity!----------", e);
	// 	socket.emit("activity", e);
	// });

	socket.on("activity#add", function(e) {
		console.log("--------activity add!----------", e);
		activities.push(e.activity);
		socket.emit("activity", {msg: e.activity, id: (activities.length-1) });
	});
});

if (!module.parent) {	
	var port = process.env.PORT || 4000;
  app.listen(port);
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
