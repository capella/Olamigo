/**
 * Created by Scaroni on 16/05/2015.
 */

// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var personSchema = new mongoose.Schema({
    name: String,
    location: {type: [Number], index: '2d'}
});

// Return model
module.exports = restful.model('Person', personSchema);