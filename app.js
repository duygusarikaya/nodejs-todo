var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');

var Todo = require(path.join(__dirname, 'models/todo'));
var User = require(path.join(__dirname, 'models/user'));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/todoapp-db',
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
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


var app = express();

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(function(request, result) {
  result.status(404).send({url: request.originalUrl + ' not found'})
});



module.exports = app;

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Server listening on the port '+port);
})
