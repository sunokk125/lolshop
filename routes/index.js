var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){ 
    res.render('index', {session:req.session.user});
  }else{
    res.render('index',{session:false});
  }
});

router.get('/champion', function(req, res, next) {
  if(req.session.user){ 
    res.render('champion', {session:req.session.user});
  }else{
    res.render('champion',{session:false});
  }
});

router.get('/skin', function(req, res, next) {
  res.render('skin');
});

router.get('/wardSkin', function(req, res, next) {
  res.render('wardSkin');
});

router.get('/serviceCenter', function(req, res, next) {
  res.render('serviceCenter');
});

module.exports = router;
