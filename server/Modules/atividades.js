//Dependencies
var express = require('express');
var router = express.Router();

var Person = require('../Models/Person');
Person.methods(['get', 'post', 'put', 'delete']);
Person.register(router,'/person');


var archetype = ["Music", "Sports", "Food", "Videogame", "Hackaton", "Others"];

router.get('/', function (req, res) {
	res.json({status: "ok", content: archetype})
});

router.post('/', function (req, res) {
	user_id = req.body.face_id;
	nome = req.body.name;
	categoria = req.body.category;

	/*Checa se categoria está em archetype*/
	var teste = archetype.indexOf(categoria);
	if (teste == -1)
		categoria = "Outros"; //Força pra outros

	Person.update({face_id: user_id}, {'activity.category': categoria}, function (err, res){
		if (err)
			res.json({status: 'error', content: err});
	});

	Person.update({face_id: user_id}, {'activity.name': nome}, function (err, res){
		if (err)
			res.json({status: 'error', content: err});
	});	
	res.json({status: 'ok', content: "everything's good"});
})

module.exports = router;