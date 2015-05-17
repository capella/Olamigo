/**
 * Created by Scaroni on 16/05/2015.
 */

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

//retrun router
module.exports = router;
