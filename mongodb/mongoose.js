/**
 * Created by Roman on 27.03.2016.
 */

var mongoose = require('mongoose'),
    Users = require('./models/userScheme');

//console.log(Users);
var connectionStr = 'mongodb://localhost:27017/pet_database';

mongoose.connect(connectionStr);
var db = mongoose.connection;
db.on('error', function(error){
    console.log(error);
});
db.once('open', function(){

    console.log("Connected to database");
    var user = Users({
        name: "Roman 1111",
        age: 24,
        sex: true
    });

    Users.create({
        name: "Roman 11112",
        age: 100,
        sex: true
    }, function(error){
        console.log("New user is created");
        if (error)
            throw new Error("Error");

        Users.find({}, function(result){
            console.log(result);
            db.close();
        });
    });

});