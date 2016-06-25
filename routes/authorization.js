/**
 * Created by Roman on 26.04.2016.
 */

var express = require('express');
var passport = require('passport');
var User = require('../models/users/user');
var router = express.Router();

router.post('/register', function(req, res, next){
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
            if (err) {
                return res.status(500).json({
                    isRegistered: false,
                    message: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    isRegistered: true,
                    message: 'Registration Successful!'});
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
                messsage: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    message: 'Could not log in user',
                    err: err
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

module.exports = router;
