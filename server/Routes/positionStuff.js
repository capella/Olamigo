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

var degreesToKmFactor =  3963.192;

router.post('/updatePos', function (req, res) {
    var name = req.body['name'];
    var geoStr = req.body.geo.split(',');
    var lat = parseFloat(geoStr[0]);
    var lon = parseFloat(geoStr[1]);
    var face_id = req.body.face_id;
    var OK = true;

    Person.update({face_id: face_id}, {$set: {location: [lon, lat]}},
        function (err)
        {
            if(err)
            {
                res.json({status: 'ok'});
            }
            else
            {
                res.json({status: 'error'});
            }
        });

});

router.post('/getNearest', function (req, res) {
    var dist = req.body['dist'];
    var geoStr = req.body.geo.split(',');
    var lat = parseFloat(geoStr[0]);
    var lon = parseFloat(geoStr[1]);

    console.log("Querying for people near ", [lat, lon], " by ", dist, " km");

    mongoose.connection.db.executeDbCommand(
        {
            geoNear: 'people',
            near: [
                lon,
                lat
            ],
            num: 10,
            spherical: true,
            distanceMultiplier: 6371, // converting results to km
            maxDistance: parseFloat(dist)
        },
        function (err, person) {
            if (err) {
                res.status(500).send({status: 'error', content: err.message});
            } else {
                res.json({status: 'ok', content: person.documents[0].results});
            }
        }
    );

    //Really wierd stuff that should work but don't
    //Person.find({location: { $within: { centerSphere: [ [lon, lat] , dist/ 6378.137 ] } }},
    //Person.find({location: { $near: [lon, lat], $maxDistance: dist/ 6378.137 }},
    //    //find({location: { $near: [-46.652022,-23.588921], $maxDistance: 100 }})
    //    function (err, person) {
    //        if (err) {
    //            res.status(500).send({status: 'error', content: err.message});
    //        } else {
    //            res.json({status: 'ok', content: person});
    //        }
    //    });
});


//retrun router
module.exports = router;
