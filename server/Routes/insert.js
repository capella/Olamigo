/**
 * Created by Scaroni on 16/05/2015.
 */
//Dependencies
var express = require('express');
var router = express.Router();

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');

router.post('/', function (req, res)
{
    var name = req.body.name;
    var person = new Person(
        {
            name: name
        }
    );
    console.log(name);
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
