var express = require('express');
var Users = require('../mongodb/models/userScheme');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.find({}, function(err, users){
    if (err)
      throw err;
    res.json(users);
  });
});

router.post('/', function(req, res, next){
  Users.create(req.body, function(err, user){
    if (err)
      throw err;

    var result = {
      id: user.id
    };
    res.json(result);
  });
});

router.put('/:id', function(req, res){
  Users.findById(req.params.id, function(err, user){
    user.name = req.body.name;
    user.age = req.body.age;
    user.sex = req.body.sex;
    user.save(function(err, newUser){
      if (err)
        throw err;
      res.json(newUser);
    });
  });
});

module.exports = router;
