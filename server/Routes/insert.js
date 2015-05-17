/**
 * Created by Scaroni on 16/05/2015.
 */
//Dependencies
var express = require('express');
var router = express.Router();
var match = require("./match");

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');

router.post('/', function (req, res)
{
    var name = req.body.name;
    var face_id = req.body.face_id;
    var gostos = req.body.gostos;
    var person = new Person(
        {
            name: name,
            face_id: face_id,
            gostos: gostos
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

router.delete('/', function (req, res)
{
    Person.remove({}, function (err, products){
        if (err){
            res.status(500).send({status: 'err', content: err});
        }
        else{
            res.json({status: 'ok', content: products});
        }
    });
})

//retrun router
module.exports = router;
