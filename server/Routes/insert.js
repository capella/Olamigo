/**
 * Created by Scaroni on 16/05/2015.
 */
//Dependencies
var express = require('express');
var router = express.Router();

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');

router.get('/:name', function (req, res) {
    var person = new Person(
        {
            name: req.params.name
        }
    );

    person.save(function (err) {
        if (err) {
            res.status(500).send({status: 'error', content: err});
        } else {
            res.json({status: 'ok', content: person});
        }
    });
});

//retrun router
module.exports = router;
