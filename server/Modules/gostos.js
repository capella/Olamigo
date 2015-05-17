//Dependencies
var express = require('express');
var router = express.Router();

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');

var gostos = ["Comedies Movies", "Action Movies", "Terror Movies", "Romance Movies", "Rock Bands", "Metal Bands", "Electronic Bands", "Classical Concerts", "Adventures", "Playing Music"];


router.get('/', function (req, res){
	res.json({status: "ok", content: gostos});
});

router.post('/', function (req, res){
	var user_id = req.body.face_id;
	var newg = req.body.gostos;
	console.log(req);

	Person.update({face_id: user_id}, {gostos: newg}, function (err, nigga){
		if (err)
			res.json({status: "error", content: err});
	})

	res.json({status: "ok", content:"everything is good"});

})

module.exports = router;