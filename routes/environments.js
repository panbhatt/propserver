var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var envController = require('../app/controllers/environment')

/* Return list of all the environments */
router.get('/', envController.getAll);
router.get('/:envName', envController.get);
router.post('/', envController.add);

module.exports = router;
