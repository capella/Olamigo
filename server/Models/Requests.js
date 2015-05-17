/**
 * Created by Scaroni on 17/05/2015.
 */

/**
 * Created by Scaroni on 16/05/2015.
 */

/*teste por Antonio 16/05 13:18*/
/*adicionado lista de gostos*/
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var RequestSchema = new mongoose.Schema({
    status: String,
    face_id: Number,
    face_id_interessado: Number,
    name: String
});


// Return model
module.exports = restful.model('Request', RequestSchema);
