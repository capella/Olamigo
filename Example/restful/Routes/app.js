 //Dependencies
 var express = require('express');
 var router = express.Router();

var Product = require('../Models/product');
Product.methods(['get', 'post', 'put', 'delete']);
Product.register(router,'/product')

//retrun router
module.exports = router;
