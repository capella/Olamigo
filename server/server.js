var express =  require('express');
var restful = require('node-restful');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/olamigo");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/list',require('./Routes/app'));
app.use('/ins',require('./Routes/insert'));
app.use('/location',require('./Routes/positionStuff'));
app.use('/',require('./Routes/bureaucraticStuff'));
app.use('/gostos',require('./Modules/gostos'));
app.use('/atividades',require('./Modules/atividades'));

app.listen(6969);
console.log('API is running on port 6969');