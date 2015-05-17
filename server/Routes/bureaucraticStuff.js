/**
 * Created by Scaroni on 16/05/2015.
 */

//Dependencies
var express = require('express');
var router = express.Router();

var restful = require('node-restful');
var mongoose = restful.mongoose;

var gcm = require("node-gcm");
var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');

var apiKey = "AIzaSyCzEiNwACgnPLvJUTFhFRtazcXjYrXJb8g";

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
        if(err)
        {
            res.status(500).send({status: 'error', content: err.message});
        }
        else
        {
            res.json({status: 'ok'});
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

    if(err)
    {
        res.status(500).send({status: 'error', content: err.message});
    }
    else
    {
        res.json({status: 'ok'});
        var fi;
        var fii;

        for (var i = 0; i < person.length; i++) {
            console.log(person[i]);
            if (person[i] == face_id) {
                fi = person[i];
            }
            if (person[i] == face_id_interessado) {
                fii = person[i];
            }
        }

        var GCM = require('gcm').GCM;

        var gcm = new GCM(apiKey);

        var message = {
            registration_id: fii.token, // required
            collapse_key: 'Collapse key',
            'message': ok,
            'data.key1': fi.face_id
        };

        gcm.send(message, function(err, messageId){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Sent confirm with message ID: ", messageId);
            }
        });
    }
});

router.post('/invite', function (req, res) {
    var face_id = req.body.face_id;
    var face_id_interessado = req.body.face_id_interessado;

    Person.find({face_id: {$in: [face_id, face_id_interessado]}}, function (err, person) {
        if(err)
        {
            res.status(500).send({status: 'error', content: err.message});
        }
        else
        {
            var fi;
            var fii;
            console.log(person, face_id, face_id_interessado);
            for (var i = 0; i < person.length; i++) {
                if(person[i].face_id == face_id)
                {
                    console.log(person[i]);
                    fi = person[i];
                }
                if(person[i].face_id == face_id_interessado)
                {
                    console.log(person[i]);
                    fii = person[i];
                }
            }

            var gcm = require('node-gcm');

            var message = new gcm.Message();
            var sender = new gcm.Sender(apiKey);
            var registrationIds = [];

            message.addData('title','You`ve got a message');
            message.addData('message',fii.name+" wants to talk to you");
            //message.addData('msgcnt','1');
            message.collapseKey = 'demo';
            message.delayWhileIdle = true;
            message.timeToLive = 3;

            // At least one token is required - each app will register a different token
            registrationIds.push(fii.token);

            /**
             * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
             */
            sender.send(message, registrationIds, 4, function (result) {
                console.log(result);
            });
            /** Use the following line if you want to send the message without retries
             sender.sendNoRetry(message, registrationIds, function (result) { console.log(result); });
             **/
            //var gcm = new GCM(apiKey);
            //
            //var message = {
            //    registration_id: fi.token, // required
            //    collapse_key: 'Collapse key',
            //    'data.key1': 'Requested',
            //    'data.key2': fii.face_id,
            //    'message': "You`ve got an invite",
            //    'mensagem': "You`ve got an invite"
            //};
            //
            //gcm.send(message, function(err, messageId){
            //    if (err) {
            //        console.log("Something has gone wrong!");
            //    } else {
            //        console.log("Sent invite with message ID: ", messageId);
            //    }
            //});
            res.json({status: 'ok'});
        }
    });
});

router.post('/sendMsg', function (req, res) {
    var a = req.body.a;
    var b = req.body.b;
    var msg = req.body.ok;

    Person.find({face_id: {$in: [a, b]}}, function (err, person) {
        if(err)
        {
            res.status(500).send({status: 'error', content: err.message});
        }
        else
        {
            res.json({status: 'ok'});
            var a;
            var bfii;

            for (var i = 0; i < person.length; i++) {
                console.log(person[i]);
                if (person[i] == a) {
                    fi = person[i];
                }
                if (person[i] == b) {
                    a = person[i];
                }
            }

            var GCM = require('gcm').GCM;

            var gcm = new GCM(apiKey);

            var message = {
                registration_id: b.token, // required
                collapse_key: 'Collapse key',
                'data.key1': a.token,
                'data.key2': msg
            };

            gcm.send(message, function(err, messageId){
                if (err) {
                    console.log("Something has gone wrong!");
                } else {
                    console.log("Sent sendMsg with message ID: ", messageId, " from ", a, " to ", b);
                }
            });
        }
    });
});

//retrun router
module.exports = router;
