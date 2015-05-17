/**
 * Created by Scaroni on 16/05/2015.
 */

var Person = require('../Models/Person');

exports.CreatePerson = function (face_id, position, name, res)
{
    var person = new Person(
        {
            name: name,
            face_id: face_id,
            location: position
        }
    );
    console.log(person);

    var callback = function (err)
    {
        if (err) {
            res.status(500).send({status: 'error', content: err});
        } else {
            res.json({status: 'ok', content: person});
        }
    };

    person.save(callback);
};
