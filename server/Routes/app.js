 //Dependencies
 var express = require('express');
 var router = express.Router();

 var Person = require('../Models/Person');
 Person.methods(['get', 'post', 'put', 'delete']);
 Person.register(router,'/person');

 router.get('/', function (req, res) {
    Person.find({}, function (err, person) {
        if (err) {
            res.status(500).send({status: 'error', content: err});
        } else {
            res.json({status: 'ok', content: person});
        }
    });
});

//retrun router
module.exports = router;
