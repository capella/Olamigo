// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var config = require('config');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = config.porta_aplicativo;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
//var gostos = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
/*router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api  00!'+config.MYSQL.host });   
});
*/

app.get('/', function(req, res) {
    res.json({ message: 'Você não é bem vindo aqui!' });   
});

gostos.post('/', function(req, res, next) {
	res.json({ message: 'Gostoso' });  
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);
app.use('/gostos', gostos);


//ERROS ------

app.use(function(err, req, res, next) {
	res.status(500);
	res.send(err.stack);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);