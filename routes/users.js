var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var EnvModel = mongoose.model('Environment') ;

/* GET home page. */
router.get('/', function(req, res, next) {
    EnvModel.list(function(err,data) {
        console.log("Received Data = ", data) ;
        res.render('index', { title: 'Express' });      
    });
  
});

module.exports = router;
