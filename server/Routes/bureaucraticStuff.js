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

var apiKey = "";

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
router.post('/bigode', function (req, res) {
    var face_id = req.body.a;
    var face_id_interessado = req.body.b;

    Person.find({face_id: {$in: [face_id, face_id_interessado]}}, function (err, person) {
        if (err) {

        }
        else {
            for (var i = 0; i < person.length; i++) {
                console.log(person[i]);
            }

            res.json({status: 'ok', content: person});
        }

    });
});

router.post('/confirm', function (req, res) {
    var face_id = req.body.face_id;
    var face_id_interessado = req.body.face_id_interessado;
    var ok = req.body.ok;

    Person.find({face_id: {$in: [face_id, face_id_interessado]}}, function (err, person) {
        if(err)
        {

        }
        else
        {
            var fi;
            var fii;

            for (var i = 0; i < person.length; i++) {
                console.log(person[i]);
                if(person[i] == face_id)
                {
                    fi = person;
                }
                if(person[i] == face_id_interessado)
                {
                    fii = person;
                }
            }

            var GCM = require('gcm').GCM;

            var gcm = new GCM(apiKey);

            var message = {
                registration_id: fii.token, // required
                collapse_key: 'Collapse key',
                'data.key1': ok
                //'data.key2': fii.token
            };

            gcm.send(message, function(err, messageId){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Sent with message ID: ", messageId);
                }
            });
        }
    });

});

router.post('/invite', function (req, res) {
    var face_id = req.body.face_id;
    var face_id_interessado = req.body.face_id_interessado;

    Person.find({face_id: {$in: [face_id, face_id_interessado]}}, function (err, person) {
        if(err)
        {

        }
        else
        {
            var fi;
            var fii;

            for (var i = 0; i < person.length; i++) {
                console.log(person[i]);
                if(person[i] == face_id)
                {
                    fi = person;
                }
                if(person[i] == face_id_interessado)
                {
                    fii = person;
                }
            }

            var GCM = require('gcm').GCM;

            var gcm = new GCM(apiKey);

            var message = {
                registration_id: fi.token, // required
                collapse_key: 'Collapse key',
                'data.key1': 'Requested',
                'data.key2': fii.token
            };

            gcm.send(message, function(err, messageId){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Sent with message ID: ", messageId);
                }
            });
        }
    });
});

//retrun router
module.exports = router;
