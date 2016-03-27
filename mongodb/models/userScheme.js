/**
 * Created by Roman on 27.03.2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userScheme = new Schema({
    name : {type : String, require: true},
    age: {type: Number, require: false},
    sex: {type: Boolean, require: true}
},{
  timestamps: true
});

var Users = mongoose.model('User', userScheme);

module.exports = Users;