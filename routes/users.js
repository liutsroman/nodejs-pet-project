var express = require('express');
var passport = require('passport');
var User = require('../models/users/user');
var Verify    = require('./verify');
var router = express.Router();

router.get('/',Verify.verifyOrdinaryUser, function(req, res, next) {
  User.find({}, function(err, users){
    if (err)
      throw err;
    res.json(users);
  });
});

router.post('/', Verify.verifyOrdinaryUser, function(req, res, next){
  User.create(req.body, function(err, user){
    if (err)
      throw err;

    var result = {
      id: user.id
    };
    res.json(result);
  });
});

router.put('/:id', Verify.verifyOrdinaryUser, function(req, res){
  User.findById(req.params.id, function(err, user){
    user.username = req.body.username;
    user.save(function(err, newUser){
      if (err)
        throw err;
      res.json(newUser);
    });
  });
});

module.exports = router;
