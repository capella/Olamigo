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
    face_id: Number,
    gostos: [String],
    score: {}
});

// Return model
module.exports = restful.model('Person', personSchema);
