/**
 * Created by Scaroni on 16/05/2015.
 */

/*teste por Antonio 16/05 13:18*/
/*adicionado lista de gostos*/
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var personSchema = new mongoose.Schema({
    name: String,
    gostos: [String],
    score: {},
    face_id: {type: Number, required: true, unique: true},
    location: {type: [Number], index: '2d'},
    token: String
});

// Return model
module.exports = restful.model('Person', personSchema);
