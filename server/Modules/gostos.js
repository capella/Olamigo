//Dependencies
var express = require('express');
var router = express.Router();

var gostos = ["Comedies Movies", "Action Movies", "Terror Movies", "Romance Movies", "Rock Bands", "Metal Bands", "Electronic Bands", "Classical Concerts", "Adventures", "Playing Music"];


router.get('/', function (req, res){
	res.json({status: "ok", content: gostos});
});

/*router.post('/', function (req, res){
	var face_id = req.face_id;

})*/

module.exports = router;