
/**
 * Module dependencies.
 */
var images1 =  ['images/demo/field.jpg', 'images/demo/gnome.jpg', 'images/demo/pencils.jpg', 'images/demo/golf.jpg'];
var images2 =  ['images/demo/field.jpg', 'images/demo/golf.jpg'];
var headlines = [
  {id: 1, title: 'one', images: images1},
  {id: 2, title: 'two', images: images2}
]
var activities = [
]

var neo4j = require('node-neo4j');
var db = new neo4j('http://localhost:7474');
var Gexf = require('./gexf');
var fs = require('fs');
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

var getAllNodesAndEdges = function(cb){
  db.cypherQuery("start n=node(*) return n", function(err, result){
    db.cypherQuery('start r=rel(*) return r', function(err, result2) {
      if(err) throw err;
      cb({nodes: result.data, edges: result2.data});
    });
  });
}

app.get('/neo', function(req, res) {
  getAllNodesAndEdges(function(result) {
    res.render('index', {
      layout: false,
      lines: result.nodes,
      relationships: result.edges
    });
  });
});

var writeFile = function(xml, cb){
  fs.writeFileSync("./bin/input.gexf", xml);
  var exec = require('child_process').exec;
  function puts(error, stdout, stderr) { cb(fs.readFileSync('./bin/output.gexf', 'utf8').toString()); }
  var the_command = "cd bin && scala -cp .:gephi-toolkit.jar gephi.App input.gexf output.gexf";
  exec(the_command, puts);
}

app.get('/gexf', function(req, res){
  getAllNodesAndEdges(function(result) {
    var r = Gexf.generate(result);
    console.log(r);
    writeFile(r, function(file) {
      res.send(file);
    });
  });
})

app.get('/', function(req, res) {
	res.render('spa', {title: 'Testers', layout: "layout"})
});

app.post('/add', function(req, res) {
  db.insertNode(req.body.attrs, function(err, node){
      if(err) throw err;
      console.log(node);
      res.send(node.id);
  });
});

app.post('/add_connection', function(req, res) {
  db.insertRelationship(req.body.nodes[0], req.body.nodes[1], req.body.type, req.body.attrs, function(err, result){
    if(err) throw err;

    console.log(result);
    res.send(result.id);
  }); 
});

app.get('/grab', function(req, res) {
  db.insertNode({
      name: 'Darth Vader',
      sex: 'male'
  },function(err, node){
      if(err) throw err;

      // Output node properties.
      console.log(node.data);

      // Output node id.
      console.log(node.id);
      res.send(node.data);
  });
});

app.get('/test', function(req, res) {
	res.render('test', {title: 'SocketTest'})
});

app.get('/headlines', function(req, res) {
	res.send(JSON.stringify(headlines));
});

app.get('/newInsightData', function(req, res) {
	res.send(JSON.stringify({}));
});

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set("json callback", true);
  app.use(express.static(__dirname + '/public'));
  app.use('/vendor', express.static(__dirname + '/bower_components'));
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
  // console.log("--------activity!----------", e);
  // socket.emit("activity", e);
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
