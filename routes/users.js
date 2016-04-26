var express = require('express');
var passport = require('passport');
var User = require('../models/users/user');
var Verify    = require('./verify');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    if (err)
      throw err;
    res.json(users);
  });
});

router.post('/register', function(req, res, next){
  User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
          return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Registration Successful!'});
        });
      });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user',
          message: err
        });
      }

      var token = Verify.getToken(user);
      res.status(200).json({
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    isLogOut: true
  });
});

router.post('/', function(req, res, next){
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
