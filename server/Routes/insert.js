/**
 * Created by Scaroni on 16/05/2015.
 */

//Dependencies
var express = require('express');
var router = express.Router();
var match = require("./match");
var modules = require('../Modules/Helpers');

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');


router.post('/', function (req, res)
{
    var name = req.body.name;
    var banana = req.body.geo.split(',');
    var face_id = req.body.face_id;
    modules.CreatePerson(face_id, banana, name, res);

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
});

//retrun router
module.exports = router;
