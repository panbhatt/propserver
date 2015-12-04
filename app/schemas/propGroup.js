var mongoose = require('mongoose');


var PropGroupSchema = new mongoose.Schema({
    
    "_docType" : { type : String, default : "propgroup"},
    "projectName" : String,
    "groupName" : String,
    "desc" : String
    
});

module.exports = PropGroupSchema;