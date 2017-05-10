var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo');
var path = require('path');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

var Todo = require(path.join(__dirname, 'models/todo'));
var User = require(path.join(__dirname, 'models/user'));

//var url = 'mongodb://localhost/todoapp-db';
var url = 'mongodb://todoappdev:tdabyds1123@ds137441.mlab.com:37441/todoapp-db';

mongoose.Promise = global.Promise;
mongoose.connect(url,
    function(error, result) {
      if(error) 
        console.log('ERROR! '+error);
      else
        console.log('connected to db.');
    });
var routes = require(path.join(__dirname, 'routes/index.js'));




// swagger definition
var swaggerDefinition = {
  info: {
    title: 'TodoApp API',
    version: '1.0.0',
    description: 'The RESTful API of TodoApp',
  },
  host: 'https://agile-ocean-55991.herokuapp.com',
  basePath: '/',
};

// options for the swagger docs
var options = {
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);




var app = express();


app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2 * 60 * 60 * 1000 }
}));

app.get('/sid', function(req, res) {
  var sess = req.session;
  var sid = req.sessionID;
  res.setHeader('Content-Type', 'text/html');
  res.send('your sessionID ' + sid + ' ');
});




// generate swagger.json
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(request, result) {
  result.status(404).send({url: request.originalUrl + ' not found'});
});



module.exports = app;

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Server listening on the port '+port);
})
