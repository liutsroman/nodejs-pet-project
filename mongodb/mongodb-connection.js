/**
 * Created by Roman on 27.03.2016.
 */

var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var connectionStr = 'mongodb://localhost:27017/pet';

mongoClient.connect(connectionStr, function(error, db){
    assert.equal(error, null);
    console.log("Server have connected to database.");
    console.log(error);

    //TODO: do some staff

    db.close();
});
