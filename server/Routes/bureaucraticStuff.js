/**
 * Created by Scaroni on 16/05/2015.
 */

//Dependencies
var express = require('express');
var router = express.Router();

var restful = require('node-restful');
var mongoose = restful.mongoose;

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');

PersonUtilities = require("../Modules/Helpers");

//logs in a user with face_id
router.post('/login', function (req, res) {
    var name = req.body['name'];
    var face_id = req.body.face_id;

    Person.find({face_id: face_id},
        function(err, person)
        {
            if(err)
            {
                res.status(500).send({status: 'error', content: err.message});
            }
            else
            {
                if(person.length == 0)
                {
                    person = PersonUtilities.CreatePerson(face_id, [0,0], name, res);
                    return;
                }
                res.json({status: 'ok', content: person});
            }
        }
    );
});

//sets a Token  on a user identifyied by face_id
router.post('/token', function (req, res) {
    var token = req.body.token;
    var face_id = req.body.face_id;

    Person.update({face_id: face_id},{$set: {token: token}},
        function(err)
        {
            if(err)
            {
                res.status(500).send({status: 'error', content: err.message});
            }
            else
            {
                res.json({status: 'ok'});
            }
        }
    );

});

//retrun router
module.exports = router;
