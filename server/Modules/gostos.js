//Dependencies
var express = require('express');
var router = express.Router();

var gostos = ["Java", "Javascript", "C", "C++", "PHP", "Scala", "Python", "Ruby", "Lua"];

router.get('/', function (req, res){
	res.json({status: "ok", content: gostos});
});

/*router.post('/', function (req, res){
	var face_id = req.face_id;

})*/

module.exports = router;