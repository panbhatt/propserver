var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var keysController = require('../app/controllers/keys')

/* Return list of all the environments */
router.get('/:keysId', keysController.getKeysById);
router.post('/:keysId', keysController.addUpdateKeysToId);
router.put('/:keysId', keysController.addUpdateKeysToId);
router.delete('/:keysId/name/:keyName', keysController.deleteKeysFromId);
router.post('/:keysId/copy', keysController.copyKeys);

module.exports = router;
