var express =  require('express');
var restful = require('node-restful');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/olamigo");

app.use('/list',require('./Routes/app'));
app.use('/ins',require('./Routes/insert'));
app.use('/location',require('./Routes/positionStuff'));
app.use('/',require('./Routes/bureaucraticStuff'));


app.listen(3000);
console.log('API is running on port 3000');