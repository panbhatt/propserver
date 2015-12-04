var mongoose = require('mongoose');


var ProjectSchema = new mongoose.Schema({
    
    "_docType" : { type : String, default : "project"},
    "projectName" : String,
    "projectDesc" : String
    
});

module.exports = ProjectSchema;