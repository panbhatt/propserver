var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var EnvModel = mongoose.model('Environment') ;
var projectController = require('../app/controllers/project');
var releaseController = require('../app/controllers/release');
var propGroupController = require('../app/controllers/propgroup');
var keysController = require('../app/controllers/keys');

/* Return list of all the projects */
router.get('/', projectController.getAll);
router.get('/:prjName', projectController.get);
router.post('/', projectController.add);

// ALl Release Related URL's.
router.get('/:prjName/release/:release',releaseController.get);
router.get('/:prjName/release',releaseController.getAll);
router.post('/:prjName/release',releaseController.add);

// ALl PropGroup Related URL's.
router.get('/:prjName/propgroup/:propgroup',propGroupController.get);
router.get('/:prjName/propgroup',propGroupController.getAll);
router.post('/:prjName/propgroup',propGroupController.add);


// All Keys 
router.get('/:prjName/env/:env/release/:release/propgroup/:propgroup',keysController.get);
router.get('/:prjName/env/:env/release/:release',keysController.getAllProperties);
router.post('/:prjName/env/:env/release/:release/propgroup/:propgroup',keysController.add);



module.exports = router;
